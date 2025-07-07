-- itsm.jsa_rule definition

-- Drop table

-- DROP TABLE jsa_rule;

CREATE TABLE jsa_rule (
	id numeric NOT NULL -- key_key,
	jsa_code varchar(100) NOT NULL -- 기준 CODE(jsa code)_JSA_CODE,
	work_stage_code varchar(100) NOT NULL -- 작업단계_WORK_STAGE_CODE,
	catg1 varchar(100) NOT NULL -- CATG1_CATG1,
	vatg2 varchar(100) NOT NULL -- VATG2_VATG2,
	risk_factors text NULL -- 유해위험요인_Risk factors,
	risk_plan text NULL -- 대책_Risk Plan,
	fre_grade varchar(100) NULL -- 빈도_frequency,
	str_grade varchar(100) NULL -- 강도_Strength,
	risk_grade varchar(100) NULL -- 위함도_Risk ,
	grade varchar(100) NULL -- 등급_Grade,
	flag varchar(1) NOT NULL -- 사용여부_flag,
	fst_reg_user_id varchar(50) NULL -- 등록자_fst_reg_user_id,
	fst_reg_dttm timestamptz NULL -- 등록일_fst_reg_dttm,
	last_reg_user_id varchar(50) NULL -- 최종 수정자_last_reg_user_id,
	last_mod_dttm timestamptz NULL -- 최종 수정일_last_mod_dttm,
	CONSTRAINT pk_jsa_rule PRIMARY KEY (id)
);
CREATE INDEX ix_jsa_rule_01 ON itsm.jsa_rule USING btree (jsa_code, work_stage_code, catg1, vatg2);
COMMENT ON TABLE itsm.jsa_rule IS 'jsa 기준관리';

-- Column comments

COMMENT ON COLUMN itsm.jsa_rule.id IS 'key_key';
COMMENT ON COLUMN itsm.jsa_rule.jsa_code IS '기준 CODE(jsa code)_JSA_CODE';
COMMENT ON COLUMN itsm.jsa_rule.work_stage_code IS '작업단계_WORK_STAGE_CODE';
COMMENT ON COLUMN itsm.jsa_rule.catg1 IS 'CATG1_CATG1';
COMMENT ON COLUMN itsm.jsa_rule.vatg2 IS 'VATG2_VATG2';
COMMENT ON COLUMN itsm.jsa_rule.risk_factors IS '유해위험요인_Risk factors';
COMMENT ON COLUMN itsm.jsa_rule.risk_plan IS '대책_Risk Plan';
COMMENT ON COLUMN itsm.jsa_rule.fre_grade IS '빈도_frequency';
COMMENT ON COLUMN itsm.jsa_rule.str_grade IS '강도_Strength';
COMMENT ON COLUMN itsm.jsa_rule.risk_grade IS '위함도_Risk ';
COMMENT ON COLUMN itsm.jsa_rule.grade IS '등급_Grade';
COMMENT ON COLUMN itsm.jsa_rule.flag IS '사용여부_flag';
COMMENT ON COLUMN itsm.jsa_rule.fst_reg_user_id IS '등록자_fst_reg_user_id';
COMMENT ON COLUMN itsm.jsa_rule.fst_reg_dttm IS '등록일_fst_reg_dttm';
COMMENT ON COLUMN itsm.jsa_rule.last_reg_user_id IS '최종 수정자_last_reg_user_id';
COMMENT ON COLUMN itsm.jsa_rule.last_mod_dttm IS '최종 수정일_last_mod_dttm';

-- Permissions

ALTER TABLE jsa_rule OWNER TO itsm;
GRANT ALL ON TABLE jsa_rule TO itsm;
GRANT UPDATE, INSERT, SELECT, DELETE ON TABLE jsa_rule TO itsmapp;
GRANT UPDATE, INSERT, SELECT, DELETE ON TABLE jsa_rule TO rl_gitsm_all;
GRANT SELECT ON TABLE jsa_rule TO rl_gitsm_sel;