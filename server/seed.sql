USE weiz_training;

INSERT INTO users (employee_no, name, role, stage)
VALUES
('A001', 'Demo 新人', 'staff', '新人'),
('A002', 'Demo 專員', 'staff', '專員'),
('M001', 'Demo 店長', 'manager', '店長')
ON DUPLICATE KEY UPDATE name = VALUES(name);

INSERT INTO question_bank
(qid, stage, q_type, dimension, title, question_text, options_json, answer_text, explain_text, image_key, created_by)
VALUES
('q1', '新人', '基本QA', '品牌認知', '關卡1｜品牌定位', 'WEiZ 銷售主張是什麼？', JSON_ARRAY('最低價導向','高顏值 + 實用 + 生活質感','只做企業大單','只賣手機殼'), '高顏值 + 實用 + 生活質感', '話術要圍繞質感生活與實用價值。', NULL, 1),
('q_new_01', '資深專員', '新品QA', '新品介紹', '新品｜耳夾藍牙耳機S12', '介紹 S12 時第一個賣點應該講什麼？', JSON_ARRAY('只講折扣','先講佩戴舒適與通勤場景','先講庫存很少','只講顏色'), '先講佩戴舒適與通勤場景', '新品介紹先情境再規格。', NULL, 1)
ON DUPLICATE KEY UPDATE title = VALUES(title), question_text = VALUES(question_text);
