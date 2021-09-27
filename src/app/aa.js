res={
    "message": {
      "id": "bfc6e2ea-3155-4201-96d9-409877205f4c",
      "first_name": "Venkat",
      "last_name": "rv",
      "emp_id": "A0003",
      "email_id": "venkatrv34@gmail.com",
      "phone_number": "9003813345",
      "address": {
        "city": "trichy"
      },
      "created_by": null,
      "profile_url": "/media/profile/ring.png",
      "created_at": "2021-09-23T08:43:48.873607Z",
      "updated_at": "2021-09-23T08:43:48.884157Z",
      "is_active": false,
      "access_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiIsImtpZCI6IjhiY2RhMjNhYWYyYTk2ZmVkZTJlNDA1YTg1ZjZlNjUxIn0.eyJ1c2VyX25hbWUiOiJ2ZW5rYXRydjM0QGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiQ2hlY2tpbmcxMjNAIiwiZXhwIjoxNjMyNDkwOTAyfQ.9F5h1sGSfWtFRbtUSu_yXLk1jx3pQPw3Bmvxt-Cn-BY",
      "refresh_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiIsImtpZCI6IjhiY2RhMjNhYWYyYTk2ZmVkZTJlNDA1YTg1ZjZlNjUxIn0.eyJ1c2VyX25hbWUiOiJ2ZW5rYXRydjM0QGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiQ2hlY2tpbmcxMjNAIiwiZXhwIjoxNjMyNTI2OTAyfQ.eJNHHVF6_pKYLTqyYTiUnXNswg-mpitouC8PX-ws2y8"
    }
  }
 
 for(let i of res){
     console.log(res)
            let ans = i.access_token
            let anss = i.refresh_token
            console.log(i.access_token, i.refresh_token)
          }