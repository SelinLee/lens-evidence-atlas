# Jeon 2026 灰度纳米模板离散 RGB 实测

核验日期 2026-11-18。Youngsun Jeon、Cherry Park、Junhwa Seong 和 Junsuk Rho，Nature Communications 17, 7037（2026）。DOI 10.1038/s41467-026-73940-1。依据是近期实制可见光器件报告了三色焦斑、Strehl、逐色功率和残余焦差。与同组已入库的 1.89 mm TPL/NIL 论文 10.1038/s41467-026-73103-2 按 DOI、工艺与几何去重。引用量或影响因子未用于此次选文。[正式主文](https://www.nature.com/articles/s41467-026-73940-1.pdf)

## 器件与实测

灰度电子束曝光（grayscale EBL）和干蚀刻制备硅负模板，直接压印可变高度与横向尺寸的圆/方树脂柱，树脂为 MINS-311RM。标称直径 **1.2 mm**，设计 **NA 0.31、f=1.8 mm**。p7 另给由焦斑宽度按 0.514λ/FWHM 计算的三色平均有效 NA **0.29**。实验用离散 RGB 准直激光、匹配镜口径的光阑、50×/NA0.5 收集物镜、筒镜与 INFINITY2-1RC CCD。三色二维焦斑共用一个焦面，原文未给该图面的精确 z、物方像素标定、轴扫步长或逐谱峰位表。[主文 pp4–8](https://www.nature.com/articles/s41467-026-73940-1.pdf#page=6)

| 波长 (nm) | 实测 x 向 FWHM (μm) | 作者 Strehl | 入射功率 (μW) | 聚焦功率 (μW) | 作者聚焦效率 (%) |
| ---: | ---: | ---: | ---: | ---: | ---: |
| 450 | 0.794 | 0.83 | 62.8 | 9.4 | 14.8 |
| 532 | 0.956 | 0.86 | 81.1 | 9.2 | 11.3 |
| 635 | 1.170 | 0.85 | 78.8 | 9.7 | 12.3 |

宽度采用 p6 Fig. 4c 印字及同页正文，Strehl 采用 Fig. 4c、p7 和补充 Table S2。作者以实测 PSF 计算二维 MTF 并与理想二维 MTF 的积分取比。Fig. 4b 中间绿色图印成 635 nm，Fig. 4a、图注、正文和实验功率表列 532 nm。按独立的正文和 Fig. 4c 录入宽度与谱序，保留 Fig. 4b 的原标签差异。[主文 Fig. 4](https://www.nature.com/articles/s41467-026-73940-1.pdf#page=6) · [补充材料](https://media.springernature.com/original/springer-static/esm/art%3A10.1038%2Fs41467-026-73940-1/MediaObjects/41467_2026_73940_MOESM1_ESM.pdf)

p7 的轴扫结论是三色焦点均在 **z=1800 μm 的设计面 7 μm 内**。蓝光单列相对设计焦距偏差 **0.27%**。Fig. 4d 的 x、z 轴单位均为 μm，亮度为归一化强度。补图 S17 是模拟分布。逐点有符号偏移、轴向绝对焦位与三色峰峰差都留空。[主文 pp6–7](https://www.nature.com/articles/s41467-026-73940-1.pdf#page=7) · [补图 S17](https://media.springernature.com/original/springer-static/esm/art%3A10.1038%2Fs41467-026-73940-1/MediaObjects/41467_2026_73940_MOESM1_ESM.pdf#page=23)

实测功率来自补充 PDF p25 Table S3 两列。作者以聚焦与入射功率之比为实验效率，未给实验积分面积、焦圈、积分面、测功光阑细则和重复次数。蓝光按表列 9.4/62.8×100 得约 14.97%，作者写 14.8%，两处保留。p4 的 3×FWHM 圆半径属于标称模拟。p4 与补充 Table S2 的标称模拟值为 25.4/18.9/20.2%。S10 的四种扩展模型按各自印字的 D 和 NA 分开保存，保持 NA 0.3 与实制设计值 0.31 的证据区分。S10 对应分母和焦圈未单列。[主文 p4](https://www.nature.com/articles/s41467-026-73940-1.pdf#page=4) · [Table S3](https://media.springernature.com/original/springer-static/esm/art%3A10.1038%2Fs41467-026-73940-1/MediaObjects/41467_2026_73940_MOESM1_ESM.pdf#page=25)

## MTF 原始数据核查

补图 S16a 中实测派生与模拟的一维曲线频率为无量纲 f/f_c，S16b/c 图轴为 f_x/f_c、f_y/f_c，上方为二维 MTF 高度。Note 15 的式 S1–S2 对 PSF 做二维傅里叶变换并取幅值。一维切线方向、各色 f_c 的物理值、二维采样与光路校准、背景扣除、裁剪和 DC 归一化步骤仍缺。已核公开材料只支持曲线、Strehl 和另行发表的功率表。发表的热图和彩色标靶图保留为图像证据，逐频表及原始 PSF 留空。[补图 S16 与式 S1–S2](https://media.springernature.com/original/springer-static/esm/art%3A10.1038%2Fs41467-026-73940-1/MediaObjects/41467_2026_73940_MOESM1_ESM.pdf#page=21)

正式主文 10 页、3,560,014 字节，SI 27 页、2,255,864 字节，透明审稿 2,236,308 字节。Europe PMC 全文 XML 只列 SI 和审稿 PDF。PMC 公共对象清单同时列主文及五张发表图。DataCite 精确 DOI 关联为零条，作者实验室论文列表只有论文入口，按 DOI、作者及题名检查可用 GitHub、Zenodo、Figshare 等索引未定位到可下载测量数组。主文 p8 Data availability 指向向通讯作者请求。此前尚未向作者索取。[PMC 附件清单](https://pmc-oa-opendata.s3.amazonaws.com/?list-type=2&prefix=PMC13392276.1%2F) · [DataCite](https://api.datacite.org/dois?query=relatedIdentifiers.relatedIdentifier%3A%2210.1038%2Fs41467-026-73940-1%22&page%5Bsize%5D=25) · [主文 p8](https://www.nature.com/articles/s41467-026-73940-1.pdf#page=8)

## 成像和复用

Fig. 4e 的负片 USAF G6/E6 在三单色及青、品红、白混合照明下有实拍。Fig. 5 是 OLED 近眼原型，保留普通色散对照。补图 S14 保存第 5、10、20 次压印复用的 SEM 及文字成像，左侧实拍文字与图注有差异。定性的偏色、模糊与复制表现无可录场点横色差、视场 MTF 或 SNR。[主文 Fig. 4–5](https://www.nature.com/articles/s41467-026-73940-1.pdf#page=6) · [补图 S14](https://media.springernature.com/original/springer-static/esm/art%3A10.1038%2Fs41467-026-73940-1/MediaObjects/41467_2026_73940_MOESM1_ESM.pdf#page=19)

本批新增 30 条、12 个配置。后续沿该文被引追查 Seong 2026 对可见光与 UV 分组的实际焦位、效率和 MTF。Park 2026 的混合成像原件继续查证。[Seong 2026](https://doi.org/10.1038/s41467-026-74547-2)
