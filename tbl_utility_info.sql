-- itsm.utility_info definition

-- Drop table

-- DROP TABLE itsm.utility_info;

CREATE TABLE itsm.utility_info (
	id numeric NOT NULL, -- key_key
	util_cd varchar(100) NOT NULL, -- 관리 코드_Util Code
	util_nm varchar(1000) NOT NULL, -- 관리 명칭_Util name
	unit_cd varchar(100) NOT NULL, -- 단위 코드_Util unit
	spec text NULL, -- 규격_Util Specification
	noti text NULL, -- 비고_Noti
	flag varchar(1) NOT NULL, -- 사용여부_FLAG
	fst_reg_user_id varchar(50) NULL, -- 등록자_fst_reg_user_id
	fst_reg_dttm timestamptz NULL, -- 등록일_fst_reg_dttm
	last_reg_user_id varchar(50) NULL, -- 최종 수정자_last_reg_user_id
	last_mod_dttm timestamptz NULL, -- 최종 수정일_last_mod_dttm
	CONSTRAINT pk_utility_info PRIMARY KEY (id)
);
CREATE INDEX ix_utility_info_01 ON itsm.utility_info USING btree (util_cd, flag);
COMMENT ON TABLE itsm.utility_info IS 'MRO 관리, 보호장구';

-- Column comments

COMMENT ON COLUMN itsm.utility_info.id IS 'key_key';
COMMENT ON COLUMN itsm.utility_info.util_cd IS '관리 코드_Util Code';
COMMENT ON COLUMN itsm.utility_info.util_nm IS '관리 명칭_Util name';
COMMENT ON COLUMN itsm.utility_info.unit_cd IS '단위 코드_Util unit';
COMMENT ON COLUMN itsm.utility_info.spec IS '규격_Util Specification';
COMMENT ON COLUMN itsm.utility_info.noti IS '비고_Noti';
COMMENT ON COLUMN itsm.utility_info.flag IS '사용여부_FLAG';
COMMENT ON COLUMN itsm.utility_info.fst_reg_user_id IS '등록자_fst_reg_user_id';
COMMENT ON COLUMN itsm.utility_info.fst_reg_dttm IS '등록일_fst_reg_dttm';
COMMENT ON COLUMN itsm.utility_info.last_reg_user_id IS '최종 수정자_last_reg_user_id';
COMMENT ON COLUMN itsm.utility_info.last_mod_dttm IS '최종 수정일_last_mod_dttm';

-- Permissions

ALTER TABLE itsm.utility_info OWNER TO itsmadm;
GRANT ALL ON TABLE itsm.utility_info TO itsmadm;
GRANT ALL ON TABLE itsm.utility_info TO itsm;
GRANT SELECT, UPDATE, DELETE, INSERT ON TABLE itsm.utility_info TO itsmapp;
GRANT SELECT, UPDATE, DELETE, INSERT ON TABLE itsm.utility_info TO rl_gitsm_all;
GRANT SELECT ON TABLE itsm.utility_info TO rl_gitsm_sel;