-- 해당 작업은 이번주 지나서 하시죠 - 변경 source 부분 수정시간이 필요합니다.

-- column rename 
ALTER TABLE jsa_rule  RENAME COLUMN work_stage_code TO work_step;
ALTER TABLE jsa_rule  RENAME COLUMN catg1 TO work_type;
ALTER TABLE jsa_rule  RENAME COLUMN vatg2 TO risk;
ALTER TABLE jsa_rule  RENAME COLUMN risk_factors TO risk_cause;
ALTER TABLE jsa_rule  RENAME COLUMN risk_plan TO risk_prepare;
ALTER TABLE jsa_rule  RENAME COLUMN fre_grade TO frequency;
ALTER TABLE jsa_rule  RENAME COLUMN str_grade TO strength;
ALTER TABLE jsa_rule  RENAME COLUMN risk_grade TO risk_degree;
ALTER TABLE jsa_rule  RENAME COLUMN grade TO grade;

-- table rename 
ALTER TABLE jsa_rule  RENAME TO risk_mgr_info ;

