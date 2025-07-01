import { useState, useEffect } from 'react'
import './List.css'
import axios from 'axios'
import { toast } from 'react-toastify'

const List = ({ url }) => {
  const [list, setList] = useState([])

  const fetchList = async () => {
    try {
      const response = await axios.get(`${url}/api/food/list`)
      if (response.data.success) {
        setList(response.data.data)
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      toast.error("Failed to fetch food list")
    }
  }

  useEffect(() => {
    fetchList()
  }, [])

  const removeFood = async (foodId) => {
    try {
      const response = await axios.delete(`${url}/api/food/remove/${foodId}`)
      await fetchList()
      if (response.data.success) {
        toast.success(response.data.message)
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      toast.error("Failed to delete food")
    }
  }

  return (
    <div className="list add flex-col">
      <p>All Foods List</p>
      <div className="list-table">
        <div className="list-table-format title">
          <p><b>Image</b></p>
          <p><b>Name</b></p>
          <p><b>Category</b></p>
          <p><b>Price</b></p>
          <p><b>Action</b></p>
        </div>
        {list.length > 0 ? (
          list.map((item) => (
            <div key={item._id} className="list-table-format">
              <img src={`${url}/uploads/images/${item.image}`} alt={item.name} />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>₹{item.price}</p>
              <p onClick={() => removeFood(item._id)} className='cursor'>X</p>
            </div>
          ))
        ) : (
          <p>No food items found</p>
        )}
      </div>
    </div>
  )
}

export default List
