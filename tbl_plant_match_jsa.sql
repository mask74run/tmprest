-- itsm.plant_match_jsa definition

-- Drop table

-- DROP TABLE itsm.plant_match_jsa;

CREATE TABLE itsm.plant_match_jsa (
	id numeric NOT NULL, -- id_key
	eq_code varchar NOT NULL, -- 설비코드_Equipment code
	plant_id numeric NOT NULL, -- 설비코드 key_설비코드 key
	seq numeric NOT NULL, -- 순번_match seq 
	jsa_id numeric NOT NULL, -- key_key
	jsa_code varchar NOT NULL, -- 기준 CODE(jsa code)_JSA_CODE
	stats_cd varchar NOT NULL, -- stats_cd_stats_cd
	fst_reg_user_id varchar(50) NULL, -- 등록자_fst_reg_user_id
	fst_reg_dttm timestamptz NULL, -- 등록일_fst_reg_dttm
	last_reg_user_id varchar(50) NULL, -- 최종 수정자_last_reg_user_id
	last_mod_dttm timestamptz NULL, -- 최종 수정일_last_mod_dttm
	CONSTRAINT pk_plant_match_jsa PRIMARY KEY (id)
);
CREATE INDEX ix_plant_match_jsa_01 ON itsm.plant_match_jsa USING btree (eq_code, stats_cd);
COMMENT ON TABLE itsm.plant_match_jsa IS 'cctv 설비  match jsa tbl';

-- Column comments

COMMENT ON COLUMN itsm.plant_match_jsa.id IS 'id_key';
COMMENT ON COLUMN itsm.plant_match_jsa.eq_code IS '설비코드_Equipment code';
COMMENT ON COLUMN itsm.plant_match_jsa.plant_id IS '설비코드 key_설비코드 key';
COMMENT ON COLUMN itsm.plant_match_jsa.seq IS '순번_match seq ';
COMMENT ON COLUMN itsm.plant_match_jsa.jsa_id IS 'key_key';
COMMENT ON COLUMN itsm.plant_match_jsa.jsa_code IS '기준 CODE(jsa code)_JSA_CODE';
COMMENT ON COLUMN itsm.plant_match_jsa.stats_cd IS 'stats_cd_stats_cd';
COMMENT ON COLUMN itsm.plant_match_jsa.fst_reg_user_id IS '등록자_fst_reg_user_id';
COMMENT ON COLUMN itsm.plant_match_jsa.fst_reg_dttm IS '등록일_fst_reg_dttm';
COMMENT ON COLUMN itsm.plant_match_jsa.last_reg_user_id IS '최종 수정자_last_reg_user_id';
COMMENT ON COLUMN itsm.plant_match_jsa.last_mod_dttm IS '최종 수정일_last_mod_dttm';

-- Permissions

ALTER TABLE itsm.plant_match_jsa OWNER TO itsm;
GRANT ALL ON TABLE itsm.plant_match_jsa TO itsm;
GRANT SELECT, UPDATE, DELETE, INSERT ON TABLE itsm.plant_match_jsa TO itsmapp;
GRANT SELECT, UPDATE, DELETE, INSERT ON TABLE itsm.plant_match_jsa TO rl_gitsm_all;
GRANT SELECT ON TABLE itsm.plant_match_jsa TO rl_gitsm_sel;