
export class NotificationDto {
     usersTo: string[]
     notification: NotificationObject
     registration_ids: string[]
}

export class NotificationObject {
     title: string
     body: string
}