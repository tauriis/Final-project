// import jwt from "jsonwebtoken";

// const generateToken = (id: string) => {
//   const token = jwt.sign({ id }, process.env.JWT_SECRET as string, {
//     expiresIn: "30d",
//   });
//   return token;
// };

// export default generateToken;

// import jwt from "jsonwebtoken";
// import { Response } from "express";

// const generateToken = (id: string, res: Response) => {
//   const token = jwt.sign({ id }, process.env.JWT_SECRET as string, {
//     expiresIn: "30d",
//   });

//   // Set the token cookie in the Set-Cookie header of the response
//   res.cookie('token', token, {
//     httpOnly: true,
//     maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days in milliseconds
//   });

//   return token;
// };

// export default generateToken;

// import jwt from "jsonwebtoken";

// const generateToken = (id: string) => {
//   const token = jwt.sign({ id }, process.env.JWT_SECRET as string, {
//     expiresIn: "30d",
//   });

//   return token;
// };

// export default generateToken;
import jwt from "jsonwebtoken";

const generateToken = (id: string) => {
  const token = jwt.sign({ id }, process.env.JWT_SECRET as string, {
    expiresIn: "30d",
  });

  return token;
};

export default generateToken;
