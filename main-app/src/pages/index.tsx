import { MinusOutlined, PlusOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import { useModel } from 'umi'
import yayJpg from '../assets/yay.jpg'

export default function HomePage() {
  const { counter, increment, decrement } = useModel('count')
  return (
    <div>
      <h2>Yay! Welcome to umi!</h2>
      <p>
        <img src={yayJpg} width="388" />
      </p>
      <p>
        To get started, edit <code>pages/index.tsx</code> and save to reload.
      </p>
      <div>
        <Button danger type="primary" icon={<MinusOutlined />} onClick={decrement} />
        <span className="mx-3">{counter}</span>
        <Button type="primary" icon={<PlusOutlined />} onClick={increment} />
      </div>
    </div>
  )
}
