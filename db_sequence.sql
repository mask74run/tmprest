--- 01 
-- itsm.sq_itsm_code_01 definition

-- DROP SEQUENCE itsm.sq_itsm_code_01;

CREATE SEQUENCE itsm.sq_itsm_code_01
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 9223372036854775807
	START 1
	CACHE 1
	NO CYCLE;

-- Permissions

ALTER SEQUENCE itsm.sq_itsm_code_01 OWNER TO itsmadm;
GRANT ALL ON SEQUENCE itsm.sq_itsm_code_01 TO itsmadm;
GRANT SELECT, USAGE ON SEQUENCE itsm.sq_itsm_code_01 TO itsmapp;
GRANT ALL ON SEQUENCE itsm.sq_itsm_code_01 TO rl_gitsm_all;
GRANT ALL ON SEQUENCE itsm.sq_itsm_code_01 TO rl_gitsm_sel;

--- 02 

-- itsm.sq_itsm_jsa_rule_01 definition

-- DROP SEQUENCE itsm.sq_itsm_jsa_rule_01;

CREATE SEQUENCE itsm.sq_itsm_jsa_rule_01
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 9223372036854775807
	START 1
	CACHE 1
	NO CYCLE;

-- Permissions

ALTER SEQUENCE itsm.sq_itsm_jsa_rule_01 OWNER TO itsm;
GRANT ALL ON SEQUENCE itsm.sq_itsm_jsa_rule_01 TO itsm;
GRANT SELECT, USAGE ON SEQUENCE itsm.sq_itsm_jsa_rule_01 TO itsmapp;
GRANT ALL ON SEQUENCE itsm.sq_itsm_jsa_rule_01 TO rl_gitsm_all;
GRANT ALL ON SEQUENCE itsm.sq_itsm_jsa_rule_01 TO rl_gitsm_sel;


---03
-- itsm.sq_itsm_plant_info_01 definition

-- DROP SEQUENCE itsm.sq_itsm_plant_info_01;

CREATE SEQUENCE itsm.sq_itsm_plant_info_01
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 9223372036854775807
	START 1
	CACHE 1
	NO CYCLE;

-- Permissions

ALTER SEQUENCE itsm.sq_itsm_plant_info_01 OWNER TO itsm;
GRANT ALL ON SEQUENCE itsm.sq_itsm_plant_info_01 TO itsm;
GRANT SELECT, USAGE ON SEQUENCE itsm.sq_itsm_plant_info_01 TO itsmapp;
GRANT ALL ON SEQUENCE itsm.sq_itsm_plant_info_01 TO rl_gitsm_all;
GRANT ALL ON SEQUENCE itsm.sq_itsm_plant_info_01 TO rl_gitsm_sel;

---04
-- itsm.sq_itsm_plant_match_jsa_01 definition

-- DROP SEQUENCE itsm.sq_itsm_plant_match_jsa_01;

CREATE SEQUENCE itsm.sq_itsm_plant_match_jsa_01
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 9223372036854775807
	START 1
	CACHE 1
	NO CYCLE;

-- Permissions

ALTER SEQUENCE itsm.sq_itsm_plant_match_jsa_01 OWNER TO itsm;
GRANT ALL ON SEQUENCE itsm.sq_itsm_plant_match_jsa_01 TO itsm;
GRANT SELECT, USAGE ON SEQUENCE itsm.sq_itsm_plant_match_jsa_01 TO itsmapp;
GRANT ALL ON SEQUENCE itsm.sq_itsm_plant_match_jsa_01 TO rl_gitsm_all;
GRANT ALL ON SEQUENCE itsm.sq_itsm_plant_match_jsa_01 TO rl_gitsm_sel;

---05
-- itsm.sq_itsm_utility_info_01 definition

-- DROP SEQUENCE itsm.sq_itsm_utility_info_01;

CREATE SEQUENCE itsm.sq_itsm_utility_info_01
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 9223372036854775807
	START 1
	CACHE 1
	NO CYCLE;

-- Permissions

ALTER SEQUENCE itsm.sq_itsm_utility_info_01 OWNER TO itsm;
GRANT ALL ON SEQUENCE itsm.sq_itsm_utility_info_01 TO itsm;
GRANT SELECT, USAGE ON SEQUENCE itsm.sq_itsm_utility_info_01 TO itsmapp;
GRANT ALL ON SEQUENCE itsm.sq_itsm_utility_info_01 TO rl_gitsm_all;
GRANT ALL ON SEQUENCE itsm.sq_itsm_utility_info_01 TO rl_gitsm_sel;

---06
-- itsm.sq_itsm_work_order_01 definition

-- DROP SEQUENCE itsm.sq_itsm_work_order_01;

CREATE SEQUENCE itsm.sq_itsm_work_order_01
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 9223372036854775807
	START 1
	CACHE 1
	NO CYCLE;

-- Permissions

ALTER SEQUENCE itsm.sq_itsm_work_order_01 OWNER TO itsm;
GRANT ALL ON SEQUENCE itsm.sq_itsm_work_order_01 TO itsm;
GRANT SELECT, USAGE ON SEQUENCE itsm.sq_itsm_work_order_01 TO itsmapp;
GRANT ALL ON SEQUENCE itsm.sq_itsm_work_order_01 TO rl_gitsm_all;
GRANT ALL ON SEQUENCE itsm.sq_itsm_work_order_01 TO rl_gitsm_sel;