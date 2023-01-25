﻿using BAL.Repositories;
using MamjiAdmin._Models;
using Microsoft.AspNetCore.Hosting;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

namespace MamjiAdmin.BLL._Services
{
    public class notificationService : baseService
    {
        notificationDB _service;
        public notificationService()
        {
            _service = new notificationDB();
        }
       
        public List<NotificationBLL> GetAll()
        {
            try
            {
                return _service.GetAll();
            }
            catch (Exception)
            {
                return new List<NotificationBLL>();
            }
        }
       
        public NotificationBLL Getbyid(int id)
        {
            try
            {
                return _service.Get(id);
            }
            catch (Exception)
            {
                return null;
            }
        }
        public int Status(NotificationBLL data)
        {
            try
            {
                var result = _service.Status(data);

                return result;
            }
            catch (Exception ex)
            {
                return 0;
            }
        }
    }
}
