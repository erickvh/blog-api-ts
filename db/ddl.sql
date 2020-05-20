create table posts(
	id serial,
	title varchar(150) not null,
	content text not null,
	description varchar(250),
	deleted boolean default false,
	created_at timestamp default now() not null,
	updated_at timestamp,
	primary key (id)
	);

create table comments(
id serial,
post_id integer not null,
owner varchar(100) default 'Anonymous' not null,
content varchar(200) not null,
primary key(id),
foreign key (post_id) references posts(id)

);