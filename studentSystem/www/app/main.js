import React from 'react'
import dva from "dva";

import studentModel from "./models/studentModel.js";
import userModel from "./models/userModel.js";
import schedulemodel from "./models/scheduleModel.js";
import router from "./router.js";

const app = dva();

app.model(studentModel)
app.model(userModel)
app.model(schedulemodel)

app.router(router)

app.start("#app")