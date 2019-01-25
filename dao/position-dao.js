/*职位相关数据访问 */
const {PositionModel}=require("./model.js");
const PositionDao={
	/*保存职位信息
	*@param username　<Object>待保存的职位对象信息
	*/
	save(positioninfo){
		return new PositionModel(positioninfo).save();
	},
	/*修改职位信息
	*@param userinfo <Object> 修改后职位对象信息
	*/
	update(positioninfo){
		const condition={_id:positioninfo._id};//修改条件
		return PositionModel.update(condition,positioninfo);
	},
	/*查询职位信息
	*@param condition <Object> 查询条件对象
	*/
	find(condition){
		return PositionModel.find(condition);
	},
	/*删除职位信息
	*@param condition <Object> 
	*/
	delete(condition){
		return PositionModel.remove(condition);
	}
};

module.exports=PositionDao;