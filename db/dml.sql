insert into posts values(default,'Title example','<h1>Hello world</h1>',null,default,default,null),(
    default,'Hello?','<h1>Hello There</h1>',null,default,default,null
);
select * from posts;

insert into "comments" values(default,1,default,'Hello an anonymous comment')
select * from "comments" 