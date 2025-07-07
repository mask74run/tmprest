-- itsm.itsm_code definition

-- Drop table

-- DROP TABLE itsm_code;

CREATE TABLE itsm_code (
	id numeric NOT NULL -- key,
	division varchar(100) NULL -- 분류,
	division_name varchar(100) NULL -- 분류명,
	part varchar(100) NULL -- 중분류,
	part_name varchar(100) NULL -- 중분류명,
	code varchar(100) NOT NULL -- 코드,
	code_name varchar(1000) NULL -- 코드명,
	code_value varchar(1000) NULL -- 코드명,
	level_code varchar(1000) NULL -- up level code,
	fst_reg_user_id varchar(50) NULL -- 최초등록사용자ID,
	fst_reg_dttm timestamptz NULL -- 최초등록일시,
	last_reg_user_id varchar(50) NULL -- 최종등록사용자ID,
	last_mod_dttm timestamptz NULL -- 최종등록일시,
	flag varchar(1) NULL -- use flage (Y:use , N: Don't use),
	CONSTRAINT pk_itsm_code PRIMARY KEY (id)
);
CREATE INDEX ix_itsm_code_01 ON itsm.itsm_code USING btree (part, code, flag);
COMMENT ON TABLE itsm.itsm_code IS 'cdmd meta code 관리';

-- Column comments

COMMENT ON COLUMN itsm.itsm_code.id IS 'key';
COMMENT ON COLUMN itsm.itsm_code.division IS '분류';
COMMENT ON COLUMN itsm.itsm_code.division_name IS '분류명';
COMMENT ON COLUMN itsm.itsm_code.part IS '중분류';
COMMENT ON COLUMN itsm.itsm_code.part_name IS '중분류명';
COMMENT ON COLUMN itsm.itsm_code.code IS '코드';
COMMENT ON COLUMN itsm.itsm_code.code_name IS '코드명';
COMMENT ON COLUMN itsm.itsm_code.code_value IS '코드명';
COMMENT ON COLUMN itsm.itsm_code.level_code IS 'up level code';
COMMENT ON COLUMN itsm.itsm_code.fst_reg_user_id IS '최초등록사용자ID';
COMMENT ON COLUMN itsm.itsm_code.fst_reg_dttm IS '최초등록일시';
COMMENT ON COLUMN itsm.itsm_code.last_reg_user_id IS '최종등록사용자ID';
COMMENT ON COLUMN itsm.itsm_code.last_mod_dttm IS '최종등록일시';
COMMENT ON COLUMN itsm.itsm_code.flag IS 'use flage (Y:use , N: Don''t use)';

-- Permissions

ALTER TABLE itsm_code OWNER TO itsm;
GRANT ALL ON TABLE itsm_code TO itsm;
GRANT UPDATE, INSERT, SELECT, DELETE ON TABLE itsm_code TO itsmapp;
GRANT UPDATE, INSERT, SELECT, DELETE ON TABLE itsm_code TO rl_gitsm_all;
GRANT SELECT ON TABLE itsm_code TO rl_gitsm_sel;