-- itsm.work_order definition

-- Drop table

-- DROP TABLE itsm.work_order;

CREATE TABLE itsm.work_order (
	id numeric NOT NULL, -- key_key
	work_order varchar NOT NULL, -- work order_work order
	eq_code varchar(100) NOT NULL, -- 설비코드_Equipment code
	write_nm varchar NULL, -- 작성자_write Name
	write_dt timestamptz NULL, -- 작성일자_write Date
	confirm_nm varchar NULL, -- 확인자_confirm name
	confirm_dt timestamptz NULL, -- 확인일자_confirm date
	company_nm varchar NULL, -- 회사명_company name
	review_nm varchar NULL, -- 검토자_review name
	review_dt timestamptz NULL, -- 검토일자_review date
	utility_p1 varchar NULL, -- 필요보호구_need utility1
	appro_nm varchar NULL, -- 승인자_approve name
	appro_dt timestamptz NULL, -- 승인일자_approve date
	utility_p2 varchar NULL, -- 필요장비/공구_need utility2
	resource_man varchar NULL, -- 투입인원_need persons
	work_seq varchar NULL, -- 순번_work seq
	pre_stage varchar NULL, -- 준비단계_pre stage
	work_dt timestamptz NULL, -- 작업일시_work date
	work_stats varchar NULL, -- 작업종료_work stats
	signature varchar NULL, -- 서명_signature
	flag varchar(1) NOT NULL, -- 사용여부_flag
	fst_reg_user_id varchar(50) NULL, -- 등록자_fst_reg_user_id
	fst_reg_dttm timestamptz NULL, -- 등록일_fst_reg_dttm
	last_reg_user_id varchar(50) NULL, -- 최종 수정자_last_reg_user_id
	last_mod_dttm timestamptz NULL, -- 최종 수정일_last_mod_dttm
	CONSTRAINT pk_work_order PRIMARY KEY (id)
);
CREATE INDEX ix_work_order_01 ON itsm.work_order USING btree (eq_code, work_order);
COMMENT ON TABLE itsm.work_order IS 'Work Order tbl';

-- Column comments

COMMENT ON COLUMN itsm.work_order.id IS 'key_key';
COMMENT ON COLUMN itsm.work_order.work_order IS 'work order_work order';
COMMENT ON COLUMN itsm.work_order.eq_code IS '설비코드_Equipment code';
COMMENT ON COLUMN itsm.work_order.write_nm IS '작성자_write Name';
COMMENT ON COLUMN itsm.work_order.write_dt IS '작성일자_write Date';
COMMENT ON COLUMN itsm.work_order.confirm_nm IS '확인자_confirm name';
COMMENT ON COLUMN itsm.work_order.confirm_dt IS '확인일자_confirm date';
COMMENT ON COLUMN itsm.work_order.company_nm IS '회사명_company name';
COMMENT ON COLUMN itsm.work_order.review_nm IS '검토자_review name';
COMMENT ON COLUMN itsm.work_order.review_dt IS '검토일자_review date';
COMMENT ON COLUMN itsm.work_order.utility_p1 IS '필요보호구_need utility1';
COMMENT ON COLUMN itsm.work_order.appro_nm IS '승인자_approve name';
COMMENT ON COLUMN itsm.work_order.appro_dt IS '승인일자_approve date';
COMMENT ON COLUMN itsm.work_order.utility_p2 IS '필요장비/공구_need utility2';
COMMENT ON COLUMN itsm.work_order.resource_man IS '투입인원_need persons';
COMMENT ON COLUMN itsm.work_order.work_seq IS '순번_work seq';
COMMENT ON COLUMN itsm.work_order.pre_stage IS '준비단계_pre stage';
COMMENT ON COLUMN itsm.work_order.work_dt IS '작업일시_work date';
COMMENT ON COLUMN itsm.work_order.work_stats IS '작업종료_work stats';
COMMENT ON COLUMN itsm.work_order.signature IS '서명_signature';
COMMENT ON COLUMN itsm.work_order.flag IS '사용여부_flag';
COMMENT ON COLUMN itsm.work_order.fst_reg_user_id IS '등록자_fst_reg_user_id';
COMMENT ON COLUMN itsm.work_order.fst_reg_dttm IS '등록일_fst_reg_dttm';
COMMENT ON COLUMN itsm.work_order.last_reg_user_id IS '최종 수정자_last_reg_user_id';
COMMENT ON COLUMN itsm.work_order.last_mod_dttm IS '최종 수정일_last_mod_dttm';

-- Permissions

ALTER TABLE itsm.work_order OWNER TO itsm;
GRANT ALL ON TABLE itsm.work_order TO itsm;
GRANT SELECT, UPDATE, DELETE, INSERT ON TABLE itsm.work_order TO itsmapp;
GRANT SELECT, UPDATE, DELETE, INSERT ON TABLE itsm.work_order TO rl_gitsm_all;
GRANT SELECT ON TABLE itsm.work_order TO rl_gitsm_sel;