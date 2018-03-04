import * as R from "ramda";

export default {
    namespace : "schedule",
    state : {
        "schedules" : []
    },
    reducers : {
        // 拉去默认数据
        init(state, {schedule}) {
            return R.set(R.lensProp("schedules"),schedule,state)
        }
    },
    effects : {
        // 拉取默认数据
        *init_async(action, {put}){
            var {schedule} = yield fetch("/schedule").then(data=>data.json());
            yield put({"type" : "init",schedule})
        },
    }
}