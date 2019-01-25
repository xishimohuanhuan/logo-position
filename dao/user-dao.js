/* 用户相关数据访问 */
const {UserModel}=require("./model.js");
const UserDao={
	/*保存用户信息
	*@param username　<Object>待保存的用户对象信息
	*/
	save(userinfo){
		return new UserModel(userinfo).save();
	},
	/*修改用户信息
	*@param userinfo <Object> 修改后用户对象信息
	*/
	update(userinfo){
		const condition={_id:userinfo._id};//修改条件
		return UserModel.update(condition,userinfo);
	},
	/*查询用户信息
	*@param condition <Object> 查询条件对象
	*/
	find(condition){
		return UserModel.find(condition);
	},
	/*删除用户信息
	*@param condition <Object> 
	*/
	delete(condition){
		return UserModel.remove(condition);
	}
};

module.exports=UserDao;