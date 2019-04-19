/*==============================================================*/
/* DBMS name:      MySQL 5.0                                    */
/* Created on:     2019/4/19 14:18:06                           */
/*==============================================================*/


drop table if exists rs_en_comment;

drop table if exists rs_en_file;

drop table if exists rs_en_post;

drop table if exists rs_en_user;

drop table if exists rs_rel_download;

drop table if exists rs_rel_own;

/*==============================================================*/
/* Table: rs_en_comment                                         */
/*==============================================================*/
create table rs_en_comment
(
  comId                int not null auto_increment,
  postId               int,
  userId               int,
  comContent           varchar(100),
  comTime              date,
  primary key (comId)
)
  auto_increment = ?;

alter table rs_en_comment comment '评论';

/*==============================================================*/
/* Table: rs_en_file                                            */
/*==============================================================*/
create table rs_en_file
(
  fileId               int not null auto_increment,
  comId                int,
  userId               int,
  uploadTime           date,
  fileSize             bigint,
  fileType             int,
  originName           national varchar(50),
  hashName             national varchar(50),
  downloadCount        int,
  needScore            int,
  isValid              bool,
  primary key (fileId)
)
  auto_increment = ?;

alter table rs_en_file comment '资源';

/*==============================================================*/
/* Table: rs_en_post                                            */
/*==============================================================*/
create table rs_en_post
(
  postId               int not null auto_increment,
  userId               int,
  postTitle            varchar(30),
  postContent          varchar(100),
  postType             varchar(50),
  postScore            int,
  postTime             date,
  primary key (postId)
)
  auto_increment = ?;

alter table rs_en_post comment '帖子
';

/*==============================================================*/
/* Table: rs_en_user                                            */
/*==============================================================*/
create table rs_en_user
(
  userId               int not null auto_increment,
  phone                varchar(20),
  wechatId             varchar(30),
  userScore            int,
  userType             int,
  regTime              date,
  password             varchar(50),
  primary key (userId)
)
  auto_increment = 0;

alter table rs_en_user comment '用户';

/*==============================================================*/
/* Table: rs_rel_download                                       */
/*==============================================================*/
create table rs_rel_download
(
  fileId               int not null,
  userId               int not null,
  primary key (fileId, userId)
);

/*==============================================================*/
/* Table: rs_rel_own                                            */
/*==============================================================*/
create table rs_rel_own
(
  fileId               int not null,
  userId               int not null,
  primary key (fileId, userId)
);

alter table rs_en_comment add constraint FK_rs_rel_post_comment foreign key (postId)
  references rs_en_post (postId) on delete restrict on update restrict;

alter table rs_en_comment add constraint FK_rs_rel_user_comment foreign key (userId)
  references rs_en_user (userId) on delete restrict on update restrict;

alter table rs_en_file add constraint FK_rs_rel_comment_file foreign key (comId)
  references rs_en_comment (comId) on delete restrict on update restrict;

alter table rs_en_file add constraint FK_rs_rel_upload foreign key (userId)
  references rs_en_user (userId) on delete restrict on update restrict;

alter table rs_en_post add constraint FK_rs_rel_user_post foreign key (userId)
  references rs_en_user (userId) on delete restrict on update restrict;

alter table rs_rel_download add constraint FK_rs_rel_download foreign key (fileId)
  references rs_en_file (fileId) on delete restrict on update restrict;

alter table rs_rel_download add constraint FK_rs_rel_download2 foreign key (userId)
  references rs_en_user (userId) on delete restrict on update restrict;

alter table rs_rel_own add constraint FK_rs_rel_own foreign key (fileId)
  references rs_en_file (fileId) on delete restrict on update restrict;

alter table rs_rel_own add constraint FK_rs_rel_own2 foreign key (userId)
  references rs_en_user (userId) on delete restrict on update restrict;

