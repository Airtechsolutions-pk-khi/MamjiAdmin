﻿
using System;
using System.Collections.Generic;
using MamjiAdmin._Models;
using MamjiAdmin.BLL._Services;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;

namespace MamjiAdmin.Controllers
{
    [Route("api/[controller]")]

    public class userController : ControllerBase
    {
        userService _service;
        public userController(IWebHostEnvironment env)
        {
            _service = new userService();
        }
        [HttpGet("all")]
        public List<LoginBLL> GetAll()
        {
            return _service.GetAll();
        }
		[HttpGet("permission")]
		public List<PermissionBLL> GetRoles()
		{
			return _service.GetRoles();
		}
		[HttpGet("user/{id}")]
        public LoginBLL Get(int id)
        {
            return _service.Get(id);
        }
        [HttpPost]
        [Route("insert")]
        public int Post([FromBody] LoginBLL obj)
        {
            return _service.Insert(obj);
        }
        [HttpPost]
        [Route("update")]
        public int PostUpdate([FromBody] LoginBLL obj)
        {
            return _service.Update(obj);
        }
        [HttpPost]
        [Route("delete")]
        public int PostDelete([FromBody] LoginBLL obj)
        {
            try
            {
                var result = _service.Delete(obj);

                return result;
            }
            catch (Exception ex)
            {
                return 0;
            }
        }
        [HttpPost]
        [Route("update/permission")]
        public int Post([FromBody] PermissionBLL obj)
        {
            return _service.UpdatePermission(obj);
        }
        [HttpGet("userpermission/{Id}")]
        public PermissionFormBLL GetPermission(string Id)
        {
            return _service.GetPermission(Id);
        }
        [HttpGet("allpermission")]
        public List<PermissionFormBLL> GetAllPermission()
        {
            return _service.GetAllPermissions();
        }
    }
}