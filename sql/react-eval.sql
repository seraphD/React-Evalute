/*
 Navicat MySQL Data Transfer

 Source Server         : localhost_3306
 Source Server Type    : MySQL
 Source Server Version : 50714
 Source Host           : localhost:3306
 Source Schema         : react-eval

 Target Server Type    : MySQL
 Target Server Version : 50714
 File Encoding         : 65001

 Date: 02/03/2019 13:00:40
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for conf
-- ----------------------------
DROP TABLE IF EXISTS `conf`;
CREATE TABLE `conf`  (
  `id` int(10) NOT NULL,
  `type` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `val` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = MyISAM CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of conf
-- ----------------------------
INSERT INTO `conf` VALUES (1, 'group_size', '3');
INSERT INTO `conf` VALUES (2, 'teach_ratio', '0.35');
INSERT INTO `conf` VALUES (3, 'student_ratio', '0.45');
INSERT INTO `conf` VALUES (4, 'self_ratio', '0.2');

-- ----------------------------
-- Table structure for eval
-- ----------------------------
DROP TABLE IF EXISTS `eval`;
CREATE TABLE `eval`  (
  `title` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `class` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `stu` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL
) ENGINE = MyISAM CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of eval
-- ----------------------------
INSERT INTO `eval` VALUES ('React', 'CS162', 'a,Nash,Tony,a,Nash,d,e,f,h');
INSERT INTO `eval` VALUES ('Vue', 'CS162', 'Nash,Tony,a,b,c,d,e,f,g,Nash,Tony,a,b,c,d,e,f,g,h,Nash,a,b,c,d,f,g,h');
INSERT INTO `eval` VALUES ('JS', 'CS162', 'Nash,Tony,a,b,c,h,Nash,a,b,c,d,e,g,h,Nash,Tony,b,d,e,f,g');
INSERT INTO `eval` VALUES ('Task1', 'CS162', 'Nash,d,e,h,b,g');
INSERT INTO `eval` VALUES ('HTML5', 'CS162', 'Nash,Tony,a,b,c,d,e,f,g,Nash,Tony,a,b,d,e,f,g,h,Nash,a,b,c,d,e,f,g,h');
INSERT INTO `eval` VALUES ('test', 'CS163', 's14,s13,s16,s15,s14,s13,s12,s16,s15,s14,s13,s12');

-- ----------------------------
-- Table structure for eval_group
-- ----------------------------
DROP TABLE IF EXISTS `eval_group`;
CREATE TABLE `eval_group`  (
  `submit` varchar(25) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `title` varchar(25) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `eval` varchar(25) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `type` int(255) NULL DEFAULT NULL
) ENGINE = MyISAM CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of eval_group
-- ----------------------------
INSERT INTO `eval_group` VALUES ('s5', 'React', 's5', 0);
INSERT INTO `eval_group` VALUES ('s4', 'React', 's7', 1);
INSERT INTO `eval_group` VALUES ('s4', 'React', 's2', 1);
INSERT INTO `eval_group` VALUES ('s4', 'React', 's1', 1);
INSERT INTO `eval_group` VALUES ('s4', 'React', 't1', 2);
INSERT INTO `eval_group` VALUES ('s4', 'React', 's4', 0);
INSERT INTO `eval_group` VALUES ('s3', 'React', 's8', 1);
INSERT INTO `eval_group` VALUES ('s3', 'React', 's10', 1);
INSERT INTO `eval_group` VALUES ('s3', 'React', 's6', 1);
INSERT INTO `eval_group` VALUES ('s3', 'React', 't1', 2);
INSERT INTO `eval_group` VALUES ('s3', 'React', 's3', 0);
INSERT INTO `eval_group` VALUES ('s1', 'Task1', 's4', 1);
INSERT INTO `eval_group` VALUES ('s1', 'Task1', 's6', 1);
INSERT INTO `eval_group` VALUES ('s1', 'Task1', 's2', 1);
INSERT INTO `eval_group` VALUES ('s1', 'Task1', 't1', 2);
INSERT INTO `eval_group` VALUES ('s1', 'Task1', 's1', 0);
INSERT INTO `eval_group` VALUES ('s2', 'React', 's8', 1);
INSERT INTO `eval_group` VALUES ('s2', 'React', 's9', 1);
INSERT INTO `eval_group` VALUES ('s2', 'React', 's5', 1);
INSERT INTO `eval_group` VALUES ('s2', 'React', 't1', 2);
INSERT INTO `eval_group` VALUES ('s2', 'React', 's2', 0);
INSERT INTO `eval_group` VALUES ('s1', 'React', 's9', 1);
INSERT INTO `eval_group` VALUES ('s1', 'React', 's4', 1);
INSERT INTO `eval_group` VALUES ('s1', 'React', 's6', 1);
INSERT INTO `eval_group` VALUES ('s1', 'React', 't1', 2);
INSERT INTO `eval_group` VALUES ('s1', 'React', 's1', 0);
INSERT INTO `eval_group` VALUES ('s5', 'React', 't1', 2);
INSERT INTO `eval_group` VALUES ('s5', 'React', 's9', 1);
INSERT INTO `eval_group` VALUES ('s5', 'React', 's4', 1);
INSERT INTO `eval_group` VALUES ('s5', 'React', 's3', 1);
INSERT INTO `eval_group` VALUES ('s2', 'Task1', 's2', 0);
INSERT INTO `eval_group` VALUES ('s2', 'Task1', 't1', 2);
INSERT INTO `eval_group` VALUES ('s2', 'Task1', 's5', 1);
INSERT INTO `eval_group` VALUES ('s2', 'Task1', 's3', 1);
INSERT INTO `eval_group` VALUES ('s2', 'Task1', 's1', 1);
INSERT INTO `eval_group` VALUES ('s3', 'Task1', 's3', 0);
INSERT INTO `eval_group` VALUES ('s3', 'Task1', 't1', 2);
INSERT INTO `eval_group` VALUES ('s3', 'Task1', 's8', 1);
INSERT INTO `eval_group` VALUES ('s3', 'Task1', 's9', 1);
INSERT INTO `eval_group` VALUES ('s3', 'Task1', 's10', 1);
INSERT INTO `eval_group` VALUES ('s8', 'React', 's7', 1);
INSERT INTO `eval_group` VALUES ('s8', 'React', 's5', 1);
INSERT INTO `eval_group` VALUES ('s8', 'React', 't1', 2);
INSERT INTO `eval_group` VALUES ('s8', 'React', 's8', 0);
INSERT INTO `eval_group` VALUES ('s1', 'JS', 's1', 0);
INSERT INTO `eval_group` VALUES ('s1', 'JS', 't1', 2);
INSERT INTO `eval_group` VALUES ('s1', 'JS', 's3', 1);
INSERT INTO `eval_group` VALUES ('s1', 'JS', 's10', 1);
INSERT INTO `eval_group` VALUES ('s1', 'JS', 's5', 1);
INSERT INTO `eval_group` VALUES ('s8', 'React', 's4', 1);
INSERT INTO `eval_group` VALUES ('s13', 'test', 's13', 0);
INSERT INTO `eval_group` VALUES ('s13', 'test', 't1', 2);
INSERT INTO `eval_group` VALUES ('s13', 'test', 's16', 1);
INSERT INTO `eval_group` VALUES ('s13', 'test', 's15', 1);
INSERT INTO `eval_group` VALUES ('s13', 'test', 's12', 1);

-- ----------------------------
-- Table structure for evaldetail
-- ----------------------------
DROP TABLE IF EXISTS `evaldetail`;
CREATE TABLE `evaldetail`  (
  `name` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `submit` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `title` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `results` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `sum` int(255) NULL DEFAULT NULL,
  `type` int(255) NULL DEFAULT NULL
) ENGINE = MyISAM CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of evaldetail
-- ----------------------------
INSERT INTO `evaldetail` VALUES ('s5', 's5', 'React', '3,2,2,2,2,2,1,3,1,2,2,3,4,6,1.5,1.5,2,5,3,3,3,1,3,5,7,7,4,4,5,4,4,2', 100, 0);
INSERT INTO `evaldetail` VALUES ('s3', 's2', 'Task1', '3,2,2,2,2,2,1,3,1,2,2,3,4,6,1.5,1.5,2,5,3,3,3,1,3,5,7,7,4,4,5,4,4,2', 100, 1);
INSERT INTO `evaldetail` VALUES ('s4', 's4', 'React', '3,2,2,2,2,2,1,3,1,2,2,3,4,6,1.5,1.5,2,5,3,3,3,1,3,5,7,7,4,4,5,4,4,2', 100, 0);
INSERT INTO `evaldetail` VALUES ('s1', 's4', 'React', '3,2,2,2,2,2,1,3,1,2,2,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0', 25, 1);
INSERT INTO `evaldetail` VALUES ('t1', 's4', 'React', '3,2,2,2,2,2,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0', 14, 2);
INSERT INTO `evaldetail` VALUES ('s8', 's3', 'React', '3,2,2,2,2,2,1,3,1,2,2,3,4,4,1.5,1.5,2,5,3,3,3,1,3,3,3,3,3,3,3,3,3,2', 82, 1);
INSERT INTO `evaldetail` VALUES ('s10', 's3', 'React', '3,2,2,2,2,2,1,3,1,2,2,3,4,4,1.5,1.5,2,3,3,3,3,1,3,4,4,4,4,4,4,4,4,2', 88, 1);
INSERT INTO `evaldetail` VALUES ('t1', 's2', 'Task1', '3,2,2,2,2,2,1,3,1,2,2,3,0,6,1.5,1.5,2,5,3,3,3,1,3,5,7,7,4,4,5,4,4,2', 96, 2);
INSERT INTO `evaldetail` VALUES ('s6', 's3', 'React', '3,2,2,2,2,2,1,3,1,2,2,3,4,6,1.5,1.5,2,3,3,3,3,1,3,4,4,4,4,4,4,4,4,2', 90, 1);
INSERT INTO `evaldetail` VALUES ('t1', 's3', 'React', '2,2,2,2,2,2,1,2,1,2,2,2,4,4,1.5,1.5,2,3,3,3,3,1,3,4,4,7,4,4,4,4,4,2', 88, 2);
INSERT INTO `evaldetail` VALUES ('s3', 's3', 'React', '3,2,2,2,2,2,1,3,1,2,2,3,3,3,1.5,1.5,2,3,3,3,3,1,3,3,7,3,3,3,3,3,0,2', 79, 0);
INSERT INTO `evaldetail` VALUES ('t1', 's1', 'Task1', '3,2,2,2,2,2,1,3,1,2,2,3,4,6,1.5,1.5,2,5,3,3,3,1,0,5,6,7,4,4,5,4,4,2', 96, 2);
INSERT INTO `evaldetail` VALUES ('s2', 's1', 'Task1', '2,2,2,2,2,2,1,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0', 15, 1);
INSERT INTO `evaldetail` VALUES ('s2', 's2', 'Task1', '3,2,2,2,2,2,1,3,1,2,2,3,3,3,1.5,1.5,2,3,3,3,3,1,3,3,3,3,3,3,3,3,3,2', 78, 0);
INSERT INTO `evaldetail` VALUES ('s5', 's2', 'React', '3,2,2,2,2,2,1,3,1,2,2,3,3,3,1.5,1.5,2,5,3,3,3,1,3,5,5,5,4,4,5,4,4,2', 92, 1);
INSERT INTO `evaldetail` VALUES ('s9', 's2', 'React', '3,2,2,2,2,2,1,3,1,2,2,3,4,4,1.5,1.5,2,5,3,3,3,1,3,3,3,3,3,4,3,3,3,2', 83, 1);
INSERT INTO `evaldetail` VALUES ('s4', 's1', 'React', '0,2,2,2,2,2,1,3,1,2,2,3,3,3,1.5,1.5,2,4,3,3,3,1,3,3,7,3,3,3,3,3,3,2', 80, 1);
INSERT INTO `evaldetail` VALUES ('s6', 's1', 'React', '3,2,2,2,2,2,1,3,1,2,2,3,3,3,1.5,1.5,2,3,3,3,3,1,3,3,3,3,3,4,3,3,3,2', 79, 1);
INSERT INTO `evaldetail` VALUES ('s2', 's2', 'React', '3,2,2,2,2,2,1,3,0,2,2,3,4,4,1.5,1.5,2,3,3,3,3,1,0,5,5,7,4,4,5,4,4,2', 90, 0);
INSERT INTO `evaldetail` VALUES ('t1', 's2', 'React', '3,2,2,2,2,2,1,2,1,2,2,2,3,3,1.5,1.5,2,5,3,3,3,1,3,3,3,3,3,4,3,3,3,2', 79, 2);
INSERT INTO `evaldetail` VALUES ('t1', 's1', 'React', '3,0,2,2,2,2,1,3,1,2,2,3,4,4,1.5,1.5,2,3,3,3,3,1,0,4,4,4,4,4,4,4,4,2', 83, 2);
INSERT INTO `evaldetail` VALUES ('s8', 's2', 'React', '3,2,2,2,2,2,1,3,1,2,2,3,4,4,1.5,1.5,2,5,3,3,3,1,3,3,3,7,3,3,3,3,3,2', 86, 1);
INSERT INTO `evaldetail` VALUES ('s9', 's1', 'React', '3,2,2,2,2,2,1,3,1,2,2,3,4,4,1.5,1.5,2,4,3,3,3,1,3,3,7,3,3,3,3,3,4,2', 86, 1);
INSERT INTO `evaldetail` VALUES ('s1', 's1', 'React', '2,2,2,2,2,2,1,2,1,2,2,2,4,2,1.5,1.5,2,2,2,2,2,1,2,2,2,2,2,2,2,2,2,2', 62, 0);
INSERT INTO `evaldetail` VALUES ('t1', 's5', 'React', '3,2,2,2,2,2,1,3,1,2,2,3,4,6,1.5,1.5,2,5,3,3,3,1,3,5,7,7,4,4,5,4,4,2', 100, 2);
INSERT INTO `evaldetail` VALUES ('s3', 's5', 'React', '3,2,2,2,2,2,1,3,1,2,2,3,4,6,1.5,1.5,2,5,3,3,3,1,3,5,7,7,4,4,5,4,4,2', 100, 1);
INSERT INTO `evaldetail` VALUES ('s4', 's5', 'React', '3,2,2,2,2,2,1,3,1,2,2,3,4,6,1.5,1.5,2,5,3,3,3,1,3,5,7,7,4,4,5,4,4,2', 100, 1);
INSERT INTO `evaldetail` VALUES ('s9', 's5', 'React', '3,2,2,2,2,2,1,3,1,2,0,0,4,6,1.5,1.5,2,5,3,3,3,1,3,5,7,7,4,4,5,4,4,2', 95, 1);
INSERT INTO `evaldetail` VALUES ('s2', 's4', 'React', '3,2,2,2,2,2,1,3,1,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0', 20, 1);
INSERT INTO `evaldetail` VALUES ('s7', 's4', 'React', '3,2,2,2,2,2,1,3,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0', 18, 1);
INSERT INTO `evaldetail` VALUES ('s5', 's2', 'Task1', '0,2,2,2,2,2,1,3,1,2,2,3,4,0,1.5,1.5,2,5,3,3,3,1,3,3,3,3,3,3,3,3,3,2', 75, 1);
INSERT INTO `evaldetail` VALUES ('s1', 's1', 'Task1', '3,2,2,2,2,2,1,3,1,2,2,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0', 25, 0);
INSERT INTO `evaldetail` VALUES ('s3', 's3', 'Task1', '3,2,2,2,2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0', 13, 0);
INSERT INTO `evaldetail` VALUES ('t1', 's3', 'Task1', '3,2,2,2,2,2,1,3,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0', 18, 2);
INSERT INTO `evaldetail` VALUES ('s6', 's1', 'Task1', '3,2,2,2,2,2,1,3,1,2,2,3,4,4,1.5,1.5,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0', 38, 1);
INSERT INTO `evaldetail` VALUES ('s9', 's3', 'Task1', '0,2,2,2,2,2,1,3,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0', 15, 1);
INSERT INTO `evaldetail` VALUES ('s4', 's1', 'Task1', '3,2,2,2,2,2,1,3,1,2,2,3,4,5,1.5,1.5,2,4,3,3,3,1,0,0,0,0,0,0,0,0,0,0', 53, 1);
INSERT INTO `evaldetail` VALUES ('s1', 's2', 'Task1', '3,2,2,2,2,2,1,3,1,2,2,3,4,4,1.5,1.5,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0', 38, 1);
INSERT INTO `evaldetail` VALUES ('s8', 's3', 'Task1', '3,2,2,2,2,2,1,3,1,2,2,3,4,6,1.5,1.5,2,5,3,3,3,1,0,0,0,0,0,0,0,0,0,0', 55, 1);
INSERT INTO `evaldetail` VALUES ('s10', 's3', 'Task1', '3,2,2,2,2,2,1,3,1,2,0,0,4,4,1.5,1.5,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0', 33, 1);
INSERT INTO `evaldetail` VALUES ('t1', 's1', 'JS', '3,2,2,2,2,2,1,3,1,2,2,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0', 25, 2);
INSERT INTO `evaldetail` VALUES ('s1', 's1', 'JS', '3,2,2,2,2,2,1,3,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0', 0, 0);
INSERT INTO `evaldetail` VALUES ('s8', 's8', 'React', '0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0', 0, 0);
INSERT INTO `evaldetail` VALUES ('t1', 's8', 'React', '3,2,2,2,2,2,1,3,1,2,2,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0', 25, 2);
INSERT INTO `evaldetail` VALUES ('s3', 's1', 'JS', '2,2,2,2,2,2,1,2,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0', 0, 1);
INSERT INTO `evaldetail` VALUES ('s13', 's13', 'test', '0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0', 0, 0);
INSERT INTO `evaldetail` VALUES ('s15', 's13', 'test', '0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0', 0, 1);
INSERT INTO `evaldetail` VALUES ('s16', 's13', 'test', '0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0', 0, 1);
INSERT INTO `evaldetail` VALUES ('t1', 's13', 'test', '0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0', 0, 2);

-- ----------------------------
-- Table structure for evalform
-- ----------------------------
DROP TABLE IF EXISTS `evalform`;
CREATE TABLE `evalform`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `tid` tinyint(4) NOT NULL,
  `table_name` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `item_order` tinyint(4) NULL DEFAULT NULL,
  `item_title` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `item_content` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `item_point` float NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 33 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of evalform
-- ----------------------------
INSERT INTO `evalform` VALUES (1, 1, '教学设计', 1, '目标设计', '教学目标清楚、具体，易于理解，便于实施，行为动词使用正确，阐述规范；符合课标要求、学科特点和学生实际；体现对知识、能力与创新思维等方面的要求', 3);
INSERT INTO `evalform` VALUES (2, 1, '教学设计', 2, '内容分析', '教学内容前后知识点关系、地位、作用描述准确，重点、难点分析清楚', 2);
INSERT INTO `evalform` VALUES (3, 1, '教学设计', 3, '学情分析', '学生认知特点和水平表述恰当，学习习惯和能力分析合理', 2);
INSERT INTO `evalform` VALUES (4, 1, '教学设计', 4, '教学过程设计1', '教学主线描述清晰，教学内容处理符合课程标准要求，具有较强的系统性和逻辑性', 2);
INSERT INTO `evalform` VALUES (5, 1, '教学设计', 5, '教学过程设计2', '教学重点突出，点面结合，深浅适度；难点清楚，把握准确；化难为易，处理恰当', 2);
INSERT INTO `evalform` VALUES (6, 1, '教学设计', 6, '教学过程设计3', '教学方法清晰适当，符合教学对象要求，有利教学内容完成、难点解决和重点突出', 2);
INSERT INTO `evalform` VALUES (7, 1, '教学设计', 7, '教学过程设计4', '教学辅助手段准备与使用清晰无误，教具及现代化教学手段运用恰当', 1);
INSERT INTO `evalform` VALUES (8, 1, '教学设计', 8, '教学过程设计5', '内容充实精要，适合学生水平；结构合理，过渡自然，便于操作；理论联系实际，注重教学互动，启发学生思考及问题解决', 3);
INSERT INTO `evalform` VALUES (9, 1, '教学设计', 9, '教学过程设计6', '注重形成性评价及生成性问题解决和利用', 1);
INSERT INTO `evalform` VALUES (10, 1, '教学设计', 10, '延伸设计', '课时分配科学、合理；辅导与答疑设置合理，练习、作业、讨论安排符合教学目标，有助强化学生反思、理解和问题解决', 2);
INSERT INTO `evalform` VALUES (11, 1, '教学设计', 11, '文档规范', '文字、符号、单位和公式符合标准规范；语言简洁、明了，字体、图表运用适当；文档结构完整，布局合理，格式美观', 2);
INSERT INTO `evalform` VALUES (12, 1, '教学设计', 12, '设计创新', '教学方案的整体设计富有创新性，较好体现课程改革的理念和要求；教学方法选择适当，教学过程设计有突出的特色', 3);
INSERT INTO `evalform` VALUES (13, 2, '多媒体课件制作', 1, '科学性', '课件取材适宜，内容科学、正确、规范 课件演示符合现代教育理念', 4);
INSERT INTO `evalform` VALUES (14, 2, '多媒体课件制作', 2, '教育性', '课件设计新颖，能体现教学设计思想；知识点结构清晰，能调动学生的学习热情', 6);
INSERT INTO `evalform` VALUES (15, 2, '多媒体课件制作', 3, '技术性1', '课件制作和使用上恰当运用多媒体效果', 1.5);
INSERT INTO `evalform` VALUES (16, 2, '多媒体课件制作', 4, '技术性2', '操作简便、快捷，交流方便，适于教学', 1.5);
INSERT INTO `evalform` VALUES (17, 2, '多媒体课件制作', 5, '艺术性', '画面设计具有较高艺术性，整体风格相对统一', 2);
INSERT INTO `evalform` VALUES (18, 3, '即席讲演', 1, '讲演内容', '主题鲜明切题，内容充实、针对性强 问题分析到位，解决策略得当、新颖，说服力强 论据贴切，符合实际，阐释充分 内容构架结构严谨、层次分明、条理清晰', 5);
INSERT INTO `evalform` VALUES (19, 3, '即席讲演', 2, '语言艺术', '普通话(英语发音)标准，用语规范，节奏处理得当，说服力强', 3);
INSERT INTO `evalform` VALUES (20, 3, '即席讲演', 3, '思维艺术', '思维敏捷，逻辑清晰；灵活而有效地调整、组织讲演内容 ', 3);
INSERT INTO `evalform` VALUES (21, 3, '即席讲演', 4, '仪表形象', '神态自然，动作适度，与讲演内容吻合', 3);
INSERT INTO `evalform` VALUES (22, 3, '即席讲演', 5, '讲演时间', '时间在2-3分钟之间，不超时', 1);
INSERT INTO `evalform` VALUES (23, 4, '模拟上课板书设计', 1, '模拟上课教学目标', '目标设置明确，符合课标要求和学生实际', 3);
INSERT INTO `evalform` VALUES (24, 4, '模拟上课板书设计', 2, '模拟上课教学内容', '重点内容讲解明白，教学难点处理恰当，关注学生已有知识和经验，注重学生能力培养，强调课堂交流互动，知识阐释正确', 5);
INSERT INTO `evalform` VALUES (25, 4, '模拟上课板书设计', 3, '模拟上课教学方法', '按新课标的教学理念处理教学内容以及教与学、知识与能力的关系，较好落实教学目标；突出自主、探究、合作学习方式，体现多元化学习方法；实现有效师生互动 ', 7);
INSERT INTO `evalform` VALUES (26, 4, '模拟上课板书设计', 4, '模拟上课教学过程', '教学整体安排合理，环节紧凑，层次清晰；创造性使用教材；教学特色突出；恰当使用多媒体课件辅助教学，教学演示规范', 7);
INSERT INTO `evalform` VALUES (27, 4, '模拟上课板书设计', 5, '模拟上课教学素质', '教态自然亲切、仪表举止得体，注重目光交流，教学语言规范准确、生动简洁', 4);
INSERT INTO `evalform` VALUES (28, 4, '模拟上课板书设计', 6, '模拟上课教学效果', '按时完成教学任务，教学目标达成度高', 4);
INSERT INTO `evalform` VALUES (29, 4, '模拟上课板书设计', 7, '模拟上课教学创新', '教学过程富有创意；能创造性的使用教材；教学方法灵活多样，有突出的特色', 5);
INSERT INTO `evalform` VALUES (30, 4, '模拟上课板书设计', 8, '板书设计内容匹配', '反映教学设计意图，突显重点、难点，能调动学生主动性和积极性', 4);
INSERT INTO `evalform` VALUES (31, 4, '模拟上课板书设计', 9, '板书设计构图', '构思巧妙，富有创意，构图自然，形象直观，教学辅助作用显著', 4);
INSERT INTO `evalform` VALUES (32, 4, '模拟上课板书设计', 10, '板书设计书写', '书写快速流畅，字形大小适度，清楚整洁，美观大方，规范正确', 2);

-- ----------------------------
-- Table structure for student
-- ----------------------------
DROP TABLE IF EXISTS `student`;
CREATE TABLE `student`  (
  `id` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `pwd` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `class` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = MyISAM CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of student
-- ----------------------------
INSERT INTO `student` VALUES ('s1', '1', 'Nash', 'CS162');
INSERT INTO `student` VALUES ('s2', '1', 'Tony', 'CS162');
INSERT INTO `student` VALUES ('s3', '1', '陈暴风烈酒', 'CS162');
INSERT INTO `student` VALUES ('s4', '1', '伊利丹怒风', 'CS162');
INSERT INTO `student` VALUES ('s5', '1', '玛雅守望者', 'CS162');
INSERT INTO `student` VALUES ('s6', '1', '卡尔', 'CS162');
INSERT INTO `student` VALUES ('s7', '1', '地狱咆哮', 'CS162');
INSERT INTO `student` VALUES ('s8', '1', 'LitchKing', 'CS162');
INSERT INTO `student` VALUES ('s9', '1', '先知.萨尔', 'CS162');
INSERT INTO `student` VALUES ('s10', '1', '霜之哀伤', 'CS162');
INSERT INTO `student` VALUES ('s11', '1', 'i', 'CS161');
INSERT INTO `student` VALUES ('s16', '4', 'n', 'CS163');
INSERT INTO `student` VALUES ('s15', '3', 'm', 'CS163');
INSERT INTO `student` VALUES ('s14', '2', 'l', 'CS163');
INSERT INTO `student` VALUES ('s13', '1', 'k', 'CS163');
INSERT INTO `student` VALUES ('s12', '1', 'j', 'CS163');

-- ----------------------------
-- Table structure for submit
-- ----------------------------
DROP TABLE IF EXISTS `submit`;
CREATE TABLE `submit`  (
  `id` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `title` varchar(20) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  `class` varchar(20) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  `doc_url` varchar(100) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  `ppt_url` varchar(100) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  `video_url` varchar(100) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  `self` int(11) NULL DEFAULT NULL,
  `tea` int(11) NULL DEFAULT NULL,
  `student` int(11) NULL DEFAULT NULL,
  `submit` int(255) NULL DEFAULT NULL,
  `eval_result` int(255) NULL DEFAULT NULL
) ENGINE = MyISAM CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of submit
-- ----------------------------
INSERT INTO `submit` VALUES ('s2', 'Tony', 'HTML5', 'CS162', '', '', '', NULL, NULL, NULL, 0, 0);
INSERT INTO `submit` VALUES ('s2', 'Tony', 'Vue', 'CS162', '', '', '', NULL, NULL, NULL, 0, 0);
INSERT INTO `submit` VALUES ('s2', 'Tony', 'JS', 'CS162', '', '', '', NULL, NULL, NULL, 0, 0);
INSERT INTO `submit` VALUES ('s2', 'Tony', 'Task1', 'CS162', 'test1.doc', 'test2.ppt', 'EP01.mp4', 16, 32, 34, 1, 81);
INSERT INTO `submit` VALUES ('s2', 'Tony', 'React', 'CS162', 'test1.doc', 'test2.ppt', 'EP01.mp4', 18, 39, 28, 1, 85);
INSERT INTO `submit` VALUES ('s7', '地狱咆哮', 'Task1', 'CS162', '', '', '', NULL, NULL, NULL, 0, 0);
INSERT INTO `submit` VALUES ('s7', '地狱咆哮', 'JS', 'CS162', '', '', '', NULL, NULL, NULL, 0, 0);
INSERT INTO `submit` VALUES ('s7', '地狱咆哮', 'Vue', 'CS162', '', '', '', NULL, NULL, NULL, 0, 0);
INSERT INTO `submit` VALUES ('s7', '地狱咆哮', 'HTML5', 'CS162', '', '', '', NULL, NULL, NULL, 0, 0);
INSERT INTO `submit` VALUES ('s7', '地狱咆哮', 'React', 'CS162', '', '', '', NULL, NULL, NULL, 0, 0);
INSERT INTO `submit` VALUES ('s1', 'Nash', 'HTML5', 'CS162', '', '', '', NULL, NULL, NULL, 0, 0);
INSERT INTO `submit` VALUES ('s1', 'Nash', 'Vue', 'CS162', '', '', '', NULL, NULL, NULL, 0, 0);
INSERT INTO `submit` VALUES ('s1', 'Nash', 'JS', 'CS162', 'test1.doc', 'test2.ppt', 'EP01.mp4', NULL, NULL, NULL, 1, 0);
INSERT INTO `submit` VALUES ('s1', 'Nash', 'React', 'CS162', 'test1.doc', 'test2.ppt', 'EP01.mp4', 12, 37, 29, 1, 78);
INSERT INTO `submit` VALUES ('s1', 'Nash', 'Task1', 'CS162', 'test1.doc', 'test2.ppt', 'EP01.mp4', 5, 16, 34, 1, 54);
INSERT INTO `submit` VALUES ('s3', '陈暴风烈酒', 'React', 'CS162', 'test1.doc', 'test2.ppt', 'EP01.mp4', 16, 39, 31, 1, 86);
INSERT INTO `submit` VALUES ('s3', '陈暴风烈酒', 'Task1', 'CS162', 'test1.doc', 'test2.ppt', 'EP01.mp4', 3, 15, 6, 1, 24);
INSERT INTO `submit` VALUES ('s3', '陈暴风烈酒', 'JS', 'CS162', '', '', '', NULL, NULL, NULL, 0, 0);
INSERT INTO `submit` VALUES ('s3', '陈暴风烈酒', 'Vue', 'CS162', '', '', '', NULL, NULL, NULL, 0, 0);
INSERT INTO `submit` VALUES ('s3', '陈暴风烈酒', 'HTML5', 'CS162', '', '', '', NULL, NULL, NULL, 0, 0);
INSERT INTO `submit` VALUES ('s4', '伊利丹怒风', 'React', 'CS162', 'test1.doc', 'test2.ppt', 'EP01.mp4', 20, 9, 5, 1, 34);
INSERT INTO `submit` VALUES ('s4', '伊利丹怒风', 'Task1', 'CS162', '', '', '', NULL, NULL, NULL, 0, 0);
INSERT INTO `submit` VALUES ('s4', '伊利丹怒风', 'JS', 'CS162', '', '', '', NULL, NULL, NULL, 0, 0);
INSERT INTO `submit` VALUES ('s4', '伊利丹怒风', 'Vue', 'CS162', '', '', '', NULL, NULL, NULL, 0, 0);
INSERT INTO `submit` VALUES ('s4', '伊利丹怒风', 'HTML5', 'CS162', '', '', '', NULL, NULL, NULL, 0, 0);
INSERT INTO `submit` VALUES ('s5', '玛雅守望者', 'React', 'CS162', 'test1.doc', 'test2.ppt', 'EP01.mp4', 20, 44, 35, 1, 99);
INSERT INTO `submit` VALUES ('s5', '玛雅守望者', 'Task1', 'CS162', '', '', '', NULL, NULL, NULL, 0, 0);
INSERT INTO `submit` VALUES ('s5', '玛雅守望者', 'JS', 'CS162', '', '', '', NULL, NULL, NULL, 0, 0);
INSERT INTO `submit` VALUES ('s5', '玛雅守望者', 'HTML5', 'CS162', '', '', '', NULL, NULL, NULL, 0, 0);
INSERT INTO `submit` VALUES ('s11', 'i', 'Vue', 'CS161', 'test1.doc', 'test2.ppt', 'EP01.mp4', NULL, NULL, NULL, 1, 0);
INSERT INTO `submit` VALUES ('s10', '霜之哀伤', 'React', 'CS162', 'test1.doc', 'test2.ppt', 'EP01.mp4', NULL, NULL, NULL, 1, 0);
INSERT INTO `submit` VALUES ('s10', '霜之哀伤', 'Task1', 'CS162', '', '', '', NULL, NULL, NULL, 0, 0);
INSERT INTO `submit` VALUES ('s10', '霜之哀伤', 'JS', 'CS162', '', '', '', NULL, NULL, NULL, 0, 0);
INSERT INTO `submit` VALUES ('s10', '霜之哀伤', 'HTML5', 'CS162', '', '', '', NULL, NULL, NULL, 0, 0);
INSERT INTO `submit` VALUES ('s8', 'LitchKing', 'React', 'CS162', 'test1.doc', 'test2.ppt', 'EP01.mp4', NULL, NULL, NULL, 1, 0);
INSERT INTO `submit` VALUES ('s8', 'LitchKing', 'Task1', 'CS162', '', '', '', NULL, NULL, NULL, 0, 0);
INSERT INTO `submit` VALUES ('s8', 'LitchKing', 'JS', 'CS162', '', '', '', NULL, NULL, NULL, 0, 0);
INSERT INTO `submit` VALUES ('s8', 'LitchKing', 'HTML5', 'CS162', '', '', '', NULL, NULL, NULL, 0, 0);
INSERT INTO `submit` VALUES ('s13', 'k', 'test', 'CS163', 'test1.doc', 'test2.ppt', 'EP01.mp4', NULL, NULL, NULL, 1, 0);
INSERT INTO `submit` VALUES ('s16', 'n', 'test', 'CS163', '', '', '', NULL, NULL, NULL, 0, 0);
INSERT INTO `submit` VALUES ('s14', 's14', 'test', 'CS163', '', '', '', NULL, NULL, NULL, 0, 0);
INSERT INTO `submit` VALUES ('s15', 's15', 'test', 'CS163', '', '', '', NULL, NULL, NULL, 0, 0);
INSERT INTO `submit` VALUES ('', 'Nash', 'React', 'CS162', '', '', '', NULL, NULL, NULL, 0, 0);
INSERT INTO `submit` VALUES ('', 'Nash', 'Task1', 'CS162', '', '', '', NULL, NULL, NULL, 0, 0);
INSERT INTO `submit` VALUES ('', 'Nash', 'JS', 'CS162', '', '', '', NULL, NULL, NULL, 0, 0);
INSERT INTO `submit` VALUES ('', 'Nash', 'HTML5', 'CS162', '', '', '', NULL, NULL, NULL, 0, 0);
INSERT INTO `submit` VALUES ('null', 'Nash', 'React', 'CS162', '', '', '', NULL, NULL, NULL, 0, 0);
INSERT INTO `submit` VALUES ('null', 'Nash', 'Task1', 'CS162', '', '', '', NULL, NULL, NULL, 0, 0);
INSERT INTO `submit` VALUES ('null', 'Nash', 'JS', 'CS162', '', '', '', NULL, NULL, NULL, 0, 0);
INSERT INTO `submit` VALUES ('null', 'Nash', 'HTML5', 'CS162', '', '', '', NULL, NULL, NULL, 0, 0);

-- ----------------------------
-- Table structure for task
-- ----------------------------
DROP TABLE IF EXISTS `task`;
CREATE TABLE `task`  (
  `title` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '任务附件',
  `detail` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `teacher` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `class` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `date_s` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `date_e` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL
) ENGINE = MyISAM CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of task
-- ----------------------------
INSERT INTO `task` VALUES ('React', 'soidfhjskldfnskl', 'Lily', 'CS162', '2019-02-28', '2019-03-26');
INSERT INTO `task` VALUES ('Task1', 'aaaaaaaaaaaaaaaaaaa', 'Lily', 'CS162', '2018-11-12', '2018-11-19');
INSERT INTO `task` VALUES ('JS', 'qqqqqqqqqqqqqqqqqqqqq', 'Lily', 'CS162', '2018-11-07', '2018-11-14');
INSERT INTO `task` VALUES ('Vue', 'sifjslkdjfklsjnfiefskdf', 'Lily', 'CS161', '2018-10-31', '2018-11-01');
INSERT INTO `task` VALUES ('HTML5', 'foisjdfsjdfkl', 'Lily', 'CS162', '2018-10-25', '2018-10-31');
INSERT INTO `task` VALUES ('test', 'sjdfsiodjfijsidjfsif', 't1', 'CS163', '2018-11-14', '2018-11-21');

-- ----------------------------
-- Table structure for teacher
-- ----------------------------
DROP TABLE IF EXISTS `teacher`;
CREATE TABLE `teacher`  (
  `id` varchar(10) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  `pwd` varchar(10) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  `name` varchar(20) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  `class` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL
) ENGINE = MyISAM CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of teacher
-- ----------------------------
INSERT INTO `teacher` VALUES ('t1', '1', 'Lily', 'CS162,CS161,CS163');

SET FOREIGN_KEY_CHECKS = 1;
