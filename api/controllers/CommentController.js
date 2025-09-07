import Comments from "../models/commentModel.js";

export const getAllComments = async (req, res) => {
  const { count } = req.query;

  if (!isNaN(count)) {
    const commentsCount = await Comments.count();
    return res.send(commentsCount.toString());
  }

  try {
    const comments = await Comments.findAll({});
    res.json(comments);
  } catch (error) {
    console.log(error);
  }
};

export const createComment = async (req, res) => {
  const { newsId, description, name, email, subject } = req.body;
  try {
    await Comments.create({
      newsId,
      description,
      name,
      email,
      subject,
    });
    res.json({ title: "نظر شما ارسال شد و بعد از تایید نمایش داده میشود." });
  } catch (error) {
    res.json(error);
  }
};

export const updateComment = async (req, res) => {
  const { description, name, subject } = req.body;
  try {
    await Comments.update(
      {
        description,
        name,
        subject,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.json({ title: "نظر با موفقیت ویرایش شد." });
  } catch (error) {
    res.json(error);
  }
};

export const deleteComment = async (req, res) => {
  try {
    await Comments.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.json({ title: "نظر با موفقیت حذف شد." });
  } catch (error) {
    res.json(error);
  }
};

export const active = async (req, res) => {
  const { isactive, id } = req.params;
  const isActiveNum = Number(isactive);

  if (isNaN(isActiveNum) || isActiveNum > 1 || isActiveNum < 0) {
    return res.status(400).json("isactive میبایست عدد 0 یا 1 باشد.");
  }

  try {
    await Comments.update(
      { isActive: Boolean(isActiveNum) },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.json("نظر فعال شد.");
  } catch (error) {
    res.json(error);
  }
};

export const deActivate = async (req, res) => {
  const { isActive } = req.body;
  try {
    await Comments.update(
      { isActive: isActive },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.json("نظر غیرفعال شد.");
  } catch (error) {
    res.json(error);
  }
};

export const getComment = async (req, res) => {
  try {
    const newsId = req.params.id;
    const comment = await Comments.findAll({
      where: {
        newsId: newsId,
      },
    });
    res.json(comment);
  } catch (error) {
    res.json(error);
  }
};
