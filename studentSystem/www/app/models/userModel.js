import * as R from "ramda";

export default {
    namespace : "user",
    state : {
        "users" : []
    },
    reducers : {
        // 拉去默认数据
        init(state, {results}) {
            return R.set(R.lensProp("users"),results,state)
        },
        // 同步修改菜单栏的头像
        change(state,{url}){
            var o = R.set(R.lensProp("url"),url,state.users);
            return R.set(R.lensProp("users"),o,state);
        },
        changeMessages(state, {password}) {
            var o = R.set(R.lensProp("password"),password,state.users);
            return R.set(R.lensProp("users"),o,state);
        }
    },
    effects : {
        // 拉取默认数据
        *init_async({id}, {put}){
            var {results} = yield fetch("/user/" + id).then(data=>data.json());
            yield put({"type" : "init",results})
        },

        *changeMessages_async ({password, id}, {put}) {
            console.log(password, id);
            yield fetch("/user/" + id,{
                method : "PATCH",
                headers : {
                    "Content-Type" : "application/json"
                },
                body : JSON.stringify({password}) 
            }).then(data=>data.json())

            yield put({"type" :"changeMessages", password})
        }
    }
}