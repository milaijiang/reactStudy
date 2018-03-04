import * as R from "ramda";
export default {
    namespace : "student",
    state : {
        loadID : 100001,
        password : 123456,
        data : [
        ]
    },
    reducers : {
        // 拉取默认数据
       init(state,{results}){
            var o = R.set(R.lensProp("data"),results,state);
            return o;
       },
    //    修改信息
       change(state, {target, id}) {
           var o = R.update(R.findIndex(R.propEq("id", id),state.data),target,state.data);
           o = R.set(R.lensProp("data"),o,state);
           return o;
       },
    //    删除信息
       delete(state, {id}) {
           var o = R.set(R.lensProp("data"),R.omit(id,state.data),state);
           console.log(o);
           
        return state;
       },
       add(state, {target}) {
           console.log(target);
           var o = R.append(target, state.data);
           o = R.set(R.lensProp("data"), o, state);
           return o;
       }
    },
    effects : {

        // 拉取数据库默认数据
        *init_async({year = 2014, xueqi = "Up"},{put}){
            console.log(year, xueqi);
            
            var {results} = yield fetch(`/messages/${year}/${xueqi}`).then(data=>data.json());
            yield put({"type" : "init",results})
        },
         // 拉取数据库默认数据
         *inits_async({year = 2014, xueqi = "Up", id},{put}){
            console.log(year, xueqi);
            
            var {results} = yield fetch(`/messages/${year}/${xueqi}/${id}`).then(data=>data.json());
            yield put({"type" : "init",results})
        },
        // 修改数据库信息
        *change_async({target, id, year= 2014, xueqi="up"}, {put}) {
                yield fetch(`/messages/${year}/${xueqi}`,{
                method : "PATCH",
                headers : {
                    "Content-Type" : "application/json"
                },
                body : JSON.stringify({target, id}) 
            }).then(data=>data.json())

            yield put({"type" : "change", target, id})
        },

        // 删除数据库数据
        *delete_async({id, xueqi="up", year="2014"}, {put}) {

            yield fetch(`/messages/${year}/${xueqi}/` + id,{
                method : "DELETE",
                headers : {
                    "Content-Type" : "application/json"
                }
            }).then(data=>data.json())

            yield put({"type" : "delete", id})
        },

        // 增加数据库数据
        *add_async({target,xueqi="up", year="2014"} , {put}) {
            
            yield fetch(`/messages/${year}/${xueqi}`,{
                method : "POST",
                headers : {
                    "Content-Type" : "application/json"
                },
                body : JSON.stringify({target}) 
            }).then(data=>data.json())

            console.log(target);

            yield put({"type" : "add", target})
            
        }
    }
}