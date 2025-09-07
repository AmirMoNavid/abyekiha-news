import FAQ from '../models/faqsModel.js';
import { trackViewHandler } from "../utils/trackViewHandler.js";
import jwt from "jsonwebtoken";
import { setCookie } from '../utils/setCookie.js';

export const trackView = async (req, res) => {
    trackViewHandler(req, res, FAQ)
}

const createFAQ = async (req, res) => {
    try {
        const { question, answer, isActive } = req.body;
        const newFAQ = await FAQ.create({ question, answer, isActive });
        res.status(201).json(newFAQ);
    } catch (error) {
        res.status(500).json({ title: error.message });
    }
};

const getAllFAQs = async (req, res) => {
    const { isActive } = req.query;

    let where = {}

    if(!isNaN(isActive)) where = { isActive };

    try {
        const faqs = await FAQ.findAll({ 
            order: [["createdAt", 'DESC']],
            where, 
        });
        res.status(200).json(faqs);
    } catch (error) {
        res.status(500).json({ title: error.message });
    }
};

const getFAQById = async (req, res) => {
    try {
        const { id } = req.params;
        const faq = await FAQ.findOne({ where: Number(id) });
        if (faq) {
            res.status(200).json(faq);
        } else {
            res.status(404).json({ title: 'FAQ not found' });
        }
    } catch (error) {
        res.status(500).json({ title: error.message });
    }
};

const updateFAQ = async (req, res) => {
    try {
        const { id } = req.params;
        const { question, answer, isActive } = req.body;
        const [updated] = await FAQ.update(
            { question, answer, isActive },
            { where: { id } }
        );
        if (updated) {
            const updatedFAQ = await FAQ.findByPk(id);
            res.status(200).json(updatedFAQ);
        } else {
            res.status(404).json({ title: 'FAQ not found' });
        }
    } catch (error) {
        res.status(500).json({ title: error.message });
    }
};

const deleteFAQ = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await FAQ.destroy({ where: { id } });
        if (deleted) {
        } else {
            res.status(404).json({ title: 'FAQ not found' });
        }
    } catch (error) {
        res.status(500).json({ title: error.message });
    }
};

const voteFAQ = async (req, res, isUpVote) => {
    const { cookies, params } = req;
    let decodedJwt = null;

    if(isNaN(params?.faqId)) {
        return res.status(400).send({ title: `bad id param. expected number recieved ${typeof params.faqId}` });
    }

    try {
        decodedJwt = jwt.decode(
            cookies.votedFaqs, 
            process.env.VOTE_ID_TOKEN_SECRET,
        );
    } 
    catch (err) {
        console.log("Error in vote faq: ", err);    
    }
    finally {
        if(!decodedJwt)
            decodedJwt = {};

        if(typeof decodedJwt?.votedFaqsId !== 'object')
            decodedJwt.votedFaqsId = {};

        if(decodedJwt.votedFaqsId[params.faqId])
            return res.sendStatus(403);
        
        decodedJwt.votedFaqsId[params.faqId] = {
            isUpVote
        };

        delete decodedJwt.exp;

        const condition = { id: Number(params.faqId) }

        let faq = await FAQ.findOne({
            where: condition,
            attributes: ["upVote", "downVote"]
        })

        let { upVote, downVote } = faq.dataValues;
        
        if (isUpVote) upVote++;
        else downVote++;

        FAQ.update(
            { upVote, downVote },
            { where: condition }
        );
        
        setCookie(
            res, 
            'votedFaqs', 
            process.env.VOTE_ID_TOKEN_SECRET, 
            decodedJwt, 
            { expireIn: '10000000h', maxAge: 360000000 }
        );

        res.sendStatus(200);
    }
}

export {
    createFAQ,
    getAllFAQs,
    voteFAQ,
    getFAQById,
    updateFAQ,
    deleteFAQ,
};
