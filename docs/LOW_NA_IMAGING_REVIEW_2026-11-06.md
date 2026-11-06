# 低NA微成像：任务边界与原文相对优先关系

日期2026-11-06；本机Codex；EVD-001c / EVD-010a / EVD-017a。基线main 96a1256/catalog0.1.6。发现Dot并行PR #12已使用EVD-001b，本批另用001c；不将其未验收的Chu记录混入本次发布。

## 1. 宏观定位

本批以NA0.1/0.106文献样本检索低NA候选，不定义行业阈值。区分：元件聚焦、可见光透射标靶成像、上转换逐点扫描成像；NA0.24仅作为邻近NA与模式对照。实际有成像演示不等于完整系统规格或可比商品。

- Shuming Wang等，2018，*A broadband achromatic metalens in the visible*，Nature Nanotechnology，DOI [10.1038/s41565-017-0052-4](https://www.nature.com/articles/s41565-017-0052-4)。南京大学/中研院/台湾大学等团队，与既有Yujie Wang 2021不同；主文和SI仍只算一项研究。
- Yujie Wang等，2021，*High-efficiency broadband achromatic metalens for near-IR biological imaging window*，Nature Communications，DOI [10.1038/s41467-021-25797-9](https://www.nature.com/articles/s41467-021-25797-9)。扩读已收录来源，不能计作新的独立团队。

实际路径：既有Wang来源→出版社HTML与PDF→SI链接；可见光原文经作者主页正式PDF读取。另沿近红外相机检索发现Li 2025 DOI10.3390/nano15060453，读取PDF节选但未全图核验：文中商用4×/NA0.1属于对照物镜，不能移植为8.6 mm口径超透镜的NA，因此未收入本批。后续可作为EVD-009候选。

## 2. 方法拆解

| 记录 | 可核验方法与结果 | 比较边界 |
| --- | --- | --- |
| wang_visible_2018_imaging | NA0.106 GaN超透镜，卤素宽带/圆偏振，USAF最小可辨线宽约2.19 μm；主文pp.230–231/Fig.4，SI Fig.8 | 后接50×/NA0.42收集物镜和CCD；50×不是整机倍率。元件400–660 nm表征不证明逐波长都达2.19 μm |
| wang_upconversion_scan_2021 | NA0.24，980 nm CW激发，655 nm/20 nm线宽发射；主文p.5报告约1.46 μm分辨率限 | 依据PSF与发射衍射极限，非本库确认的直接标靶线宽；SI Note7：1/3 Airy Unit虚拟针孔、逐点三维台扫描、CCD-1与超透镜焦平面共轭 |
| wang_low_na_achromat（扩读） | NA0.1；主文p.5/Fig.4a实测平均88.5%，SI Note1写88.1% | 此差异未解。SI Note3约93%对应主文p.3/Fig.2d数值模拟；已消除模拟/实测混淆，不能将93%替换实测 |

两项成像分辨率单位都为长度，但判据、激发/探测谱段、扫描和处理不同，不能单凭数值排序。线宽不等于线对周期，约2.19 μm不改称MTF50；作者20 nm linewidth不擅自标成FWHM。完整视场、物像距离、物方有效NA、曝光/驻留和误差仍缺，不用图上比例尺填空。

## 3. 图表与原文定位

实际读取2018作者托管正式PDF相关pp.229–231，视觉核对pp.230–231 Fig.3/4及成像段，SI PDF第8页Fig.8光路；2021主文相关段，视觉核对p.3 Fig.2模拟标记、p.5 Fig.4和p.6 Fig.5/Methods，SI DOCX相关XML正文/图注与提取Fig.7/9原图（白底显示）。未渲染完整SI DOCX，也未重建原始数据或数字化曲线。

- 2018 Fig.4d–f为校色前、g–i为强度补偿后；不能把校色后图当原始色彩保真证据。
- 2021 SI Note5文字/光路图对USAF靶位置的表达存在歧义，本批不用该段推断NA0.1完整成像参数。
- 2021主文p.5左栏明确称聚焦效率相比achromatism对填补近红外低效率缺口更关键。这是**特定研发任务的两项相对关系**；不是所有显微物镜排序。P1/P2仅本库编码，原文无数字权重；以chromatic_shift导航消色差证据不等于作者给轴向焦移权重。

## 4. 批判与迁移

当前app_04改为上述限定作者比较；删除旧宽泛编辑排序，保留原候选导航和未完成的整套物镜排序缺口。前端区分作者比较/编辑判断，显示原文定位；校验器阻止应用标签与条目basis矛盾或空排名。原有其他6类编辑性应用未升级为作者排名。

落库2条成像记录、3条来源入口，扩读既有2021主文，目录共33应用/21指标/66记录/86来源。新增独立研究仅2018一项，未新增最佳。EVD-001仍缺第二个同任务、完整条件的低NA成像样本与定量视场/共轭；NA0.24对照不能强行补齐此验收。

验证：29项测试、构建通过；独立本机Chrome无头会话操作作者页、编辑页、新记录弹窗开关、重复搜索和清空，截图可读。未声称移动端或全站回归。合并、发布结果在研究日志单独记录。

原始获取链接（仅链接，不上传全文）：[2018作者托管PDF](https://taoli.nju.edu.cn/_upload/article/files/d9/cd/67d6140d4495b9eac98ed886dec2/b8fb9284-afb9-42ca-8622-02dd126773d7.pdf)、[2018 SI](https://static-content.springer.com/esm/art%3A10.1038%2Fs41565-017-0052-4/MediaObjects/41565_2017_52_MOESM1_ESM.pdf)、[2021 PDF](https://www.nature.com/articles/s41467-021-25797-9.pdf)、[2021 SI DOCX](https://static-content.springer.com/esm/art%3A10.1038%2Fs41467-021-25797-9/MediaObjects/41467_2021_25797_MOESM1_ESM.docx)。
