import { Response, Poll } from '../models/pollModel.js';
import jwt from "jsonwebtoken";
import { setCookie } from '../utils/setCookie.js';

const createPoll = async (req, res) => {
  try {
    const { title, description } = req.body;
    const poll = await Poll.create({ title, description });
    res.status(201).json(poll);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getPolls = async (req, res) => {
  try {
    const polls = await Poll.findAll();
    res.status(200).json(polls);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getPollById = async (req, res) => {
  try {
    const { id } = req.params;
    const poll = await Poll.findByPk(id);
    if (!poll) {
      return res.status(404).json({ error: 'Poll not found' });
    }
    res.status(200).json(poll);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createResponse = async (req, res) => {
  try {
    const { formData, fullName, nationalCode } = req.body;
    await Response.create({ formData, fullName, nationalCode });
    
    const { cookies } = req;
    let decodedJwt = null;

    try {
      decodedJwt = jwt.decode(
        cookies.isAnswered, 
        process.env.POLL_TOKEN_SECRET,
      );
    } 
    catch (err) {
      console.log("Error in poll response: ", err);    
    }
    finally {
      if(!decodedJwt) decodedJwt = { isAnswered: true };

      delete decodedJwt.exp;
      
      setCookie(
        res, 
        'isPollAnswered', 
        process.env.POLL_TOKEN_SECRET, 
        decodedJwt, 
        { expireIn: '7d', maxAge: 7 * 24 * 60 * 60 * 1000 }
      );

      res.sendStatus(200);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getResponses = async (req, res) => {
  try {
    const responses = await Response.findAll();
    res.status(200).json(responses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

const getResponsesByPoll = async (req, res) => {
  try {
    const { pollId } = req.params;
    const responses = await Response.findAll({ where: { pollId } });
    res.status(200).json(responses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export { createPoll, getPolls, getPollById, createResponse, getResponses, getResponsesByPoll };
