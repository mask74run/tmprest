-- itsm.plant_info definition

-- Drop table

-- DROP TABLE itsm.plant_info;

CREATE TABLE itsm.plant_info (
	id numeric NOT NULL, -- key_
	eq_code varchar(100) NOT NULL, -- 설비코드_Equipment code
	gubun varchar(100) NULL, -- 구분(TYPE)_gubun type
	setup_dt timestamptz NOT NULL, -- 설치일_setup Date
	fac_cd varchar(100) NOT NULL, -- 공장_factory CD
	setup_place varchar(3000) NOT NULL, -- 설치장소_Setup Place
	spec varchar(3000) NULL, -- 규격_specification
	model varchar(100) NULL, -- 모델_Model
	maker varchar(1000) NULL, -- 메이커_Maker
	ip_addr varchar(100) NULL, -- IP_IP address
	com_port varchar(10) NULL, -- PORT_Com Port
	rgb varchar(1000) NULL, -- RGB_RGB
	noti text NULL, -- 특성_Notification
	qr_cd text NULL, -- QR CODE_Quick-Response Code
	pre_chk_dt timestamptz NULL, -- 예방조치일_Prevention Check Date
	effec_dt timestamptz NULL, -- 조치일자_effective date
	flag varchar(1) NOT NULL, -- 사용여부_
	fst_reg_user_id varchar(50) NULL, -- 등록자_
	fst_reg_dttm timestamptz NULL, -- 등록일_
	last_reg_user_id varchar(50) NULL, -- 최종 수정자_
	last_mod_dttm timestamptz NULL, -- 최종 수정일_
	CONSTRAINT pk_plant_info PRIMARY KEY (id)
);
CREATE INDEX ix_plant_info_01 ON itsm.plant_info USING btree (eq_code, gubun, fac_cd);
COMMENT ON TABLE itsm.plant_info IS '설비 관리 -CCTV';

-- Column comments

COMMENT ON COLUMN itsm.plant_info.id IS 'key_';
COMMENT ON COLUMN itsm.plant_info.eq_code IS '설비코드_Equipment code';
COMMENT ON COLUMN itsm.plant_info.gubun IS '구분(TYPE)_gubun type';
COMMENT ON COLUMN itsm.plant_info.setup_dt IS '설치일_setup Date';
COMMENT ON COLUMN itsm.plant_info.fac_cd IS '공장_factory CD';
COMMENT ON COLUMN itsm.plant_info.setup_place IS '설치장소_Setup Place';
COMMENT ON COLUMN itsm.plant_info.spec IS '규격_specification';
COMMENT ON COLUMN itsm.plant_info.model IS '모델_Model';
COMMENT ON COLUMN itsm.plant_info.maker IS '메이커_Maker';
COMMENT ON COLUMN itsm.plant_info.ip_addr IS 'IP_IP address';
COMMENT ON COLUMN itsm.plant_info.com_port IS 'PORT_Com Port';
COMMENT ON COLUMN itsm.plant_info.rgb IS 'RGB_RGB';
COMMENT ON COLUMN itsm.plant_info.noti IS '특성_Notification';
COMMENT ON COLUMN itsm.plant_info.qr_cd IS 'QR CODE_Quick-Response Code';
COMMENT ON COLUMN itsm.plant_info.pre_chk_dt IS '예방조치일_Prevention Check Date';
COMMENT ON COLUMN itsm.plant_info.effec_dt IS '조치일자_effective date';
COMMENT ON COLUMN itsm.plant_info.flag IS '사용여부_';
COMMENT ON COLUMN itsm.plant_info.fst_reg_user_id IS '등록자_';
COMMENT ON COLUMN itsm.plant_info.fst_reg_dttm IS '등록일_';
COMMENT ON COLUMN itsm.plant_info.last_reg_user_id IS '최종 수정자_';
COMMENT ON COLUMN itsm.plant_info.last_mod_dttm IS '최종 수정일_';

-- Permissions

ALTER TABLE itsm.plant_info OWNER TO itsm;
GRANT ALL ON TABLE itsm.plant_info TO itsm;
GRANT SELECT, UPDATE, DELETE, INSERT ON TABLE itsm.plant_info TO itsmapp;
GRANT SELECT, UPDATE, DELETE, INSERT ON TABLE itsm.plant_info TO rl_gitsm_all;
GRANT SELECT ON TABLE itsm.plant_info TO rl_gitsm_sel;