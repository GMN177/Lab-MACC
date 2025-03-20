import nationRouter from "./nationService.js";
import plantRouter from "./plantService.js";
import userRouter from "./userService.js";

const applyRoutes = (app) => {
  app.use("/api/nations", nationRouter);
  app.use("/api/plants", plantRouter);
  app.use("/api/users", userRouter);
};

export default applyRoutes;
