## 권한 정리

DB 명 : pitsm
Schema 명 : itsm
Schema 오너 : itsmadm
APP 유저 : itsmapp



# 1. Admin 유저, 일반 유저, 롤 생성 및 권한 부여(pitsm DB에서 슈퍼유저로 진행)


create user itsmadm with password 'itsm1234!' login;

create schema itsm;
CREATE DATABASE itsm_db OWNER itsmadm;

alter schema itsm owner to itsmadm;

grant connect on database pitsm to itsmadm;
grant all on schema itsm to itsmadm;

create user itsmapp with password 'itsm1234!' login;

grant connect on database pitsm to itsmapp;
grant usage on schema itsm to itsmapp;

revoke connect on database postgres from itsmadm;
revoke connect on database postgres from itsmapp;

alter role itsmadm set search_path to itsm;
alter role itsmapp set search_path to itsm; 


SHOW search_path;


# 2. admin 계정으로 변경하여 일반 계정 권한 작업(pitsm  DB의 itsm 스키마에서 itsmadm 계정으로 진행)

alter default privileges in schema itsm grant delete, update, select, insert on tables to itsmapp;
alter default privileges in schema itsm grant select, usage on sequences to itsmapp;
alter default privileges in schema itsm grant execute on functions to itsmapp;
