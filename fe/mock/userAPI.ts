const users = Array.from({ length: 100 }).map((_, index: number) => {
  return {
    id: index,
    name: `Umi ${index}`,
    nickName: `U ${index}`,
    gender: index % 2 ? 'MALE' : '',
  };
});

export default {
  'GET /api/v1/queryUserList': (req: any, res: any) => {
    const page = Number(req.query.page) || 1;
    const pageSize = Number(req.query.pageSize) || 10;
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    const userList = users.slice(start, end);
    return res.json({
      success: true,
      data: {
        list: userList,
        total: users.length,
        currentPage: page,
        pageSize,
      },
      errorCode: 0,
    });
  },
  'POST /api/v1/user': (req: any, res: any) => {
    const { name, nickName, gender } = req.body;
    if (!name || !nickName) {
      return res.json({
        success: false,
        errorCode: 400,
        message: 'Bad request',
      });
    }
    const newUser = {
      id: users.length,
      name,
      nickName,
      gender,
    };
    users.push(newUser);
    return res.json({
      success: true,
      data: newUser,
      errorCode: 0,
    });
  },
  'PUT /api/v1/user/:id': (req: any, res: any) => {
    const id = req.params.id;
    let user = users.find((u) => u.id === Number(id));
    if (!user) {
      return res.json({
        success: false,
        errorCode: 404,
        message: 'User not found',
      });
    }
    const { name, nickName, gender } = req.body;
    if (name) {
      user.name = name;
    }
    if (nickName) {
      user.nickName = nickName;
    }
    if (gender) {
      user.gender = gender;
    }
    return res.json({
      success: true,
      data: user,
      errorCode: 0,
    });
  },
  'DELETE /api/v1/user/:id': (req: any, res: any) => {
    const id = req.params.id;
    const index = users.findIndex((u) => u.id === Number(id));
    if (index === -1) {
      return res.json({
        success: false,
        errorCode: 404,
        message: 'User not found',
      });
    }
    const deletedUser = users.splice(index, 1)[0];
    return res.json({
      success: true,
      data: deletedUser,
      errorCode: 0,
    });
  },
};
