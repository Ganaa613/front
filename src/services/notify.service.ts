import { notification } from "antd";

class NotifyService {
  success = (message: string) => {
    notification.success({ message, placement: 'bottomRight',  })
  }
  info = (message: string) => {
    notification.info({ message, placement: 'bottomRight', })
  }
  error = (message: string) => {
    notification.error({ message, placement: 'bottomRight', })
  }
}

export default new NotifyService()