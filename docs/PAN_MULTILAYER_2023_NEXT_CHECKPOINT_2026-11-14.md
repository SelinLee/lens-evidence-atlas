# Pan2023三维多层高NA消色差：下一批检查点

QUALITY-001p；2026-11-14。接续Jeon2026已发布的RGB三维器件，核查较早的多层高NA可见光实制工作；具体篇名仅在待办/日志，不修改长期目标。当前20研究/77配置/687行，尚未录入Pan数值。

## 宏观定位与去重

[Cheng-Feng Pan et al., 3D-printed multilayer structures for high–numerical aperture achromatic metalenses](https://pmc.ncbi.nlm.nih.gov/articles/PMC10732525/)，Science Advances **9(51), eadj9262 (2023)**，DOI **10.1126/sciadv.adj9262**。PMC/PubMed元数据核对：文章发布2023-12-20、期次日期2023-12-22，应区分。以三维制造主题检索定位原作，未把该文说成Jeon参考文献。理由是20μm口径、NA0.5/0.7多层实制、六波长PSF/焦位与白光/RGB成像，补充毫米级低NA器件的测量范围；未用引用量或期刊影响因子。最新库/题录及只读08_references按DOI/题名文本检索未匹配，正式录入前再次去重。

## 已取得与阅读边界

独立无头Google Chrome取得PMC实际文章正文（响应**203**，约4.88万字符）；限定读设计、实验结果、Fig3/4图注、MTF相关段及Data and materials availability。原图尚未视觉查看，PDF/SI尚未取得，不能称全文/补充材料精读完成。材料仅在本机`/tmp/lens-mtf-audit/`，不提交原文。

以下四个PDF请求均**403**，未取得有效PDF，不填SHA256：

- [PMC主文PDF](https://pmc.ncbi.nlm.nih.gov/articles/PMC10732525/pdf/sciadv.adj9262.pdf)。
- [PMC补充PDF](https://pmc.ncbi.nlm.nih.gov/articles/instance/10732525/bin/sciadv.adj9262_sm.pdf)。
- [期刊主文PDF](https://www.science.org/doi/pdf/10.1126/sciadv.adj9262)。
- [期刊补充PDF](https://www.science.org/doi/suppl/10.1126/sciadv.adj9262/suppl_file/sciadv.adj9262_sm.pdf)。

作者存档[SUTD](https://repository.sutd.edu.sg/esploro/outputs/journalArticle/3D-printed-multilayer-structures-for-high-numerical-aperture/9911658809846)及arXiv **2308.14051**已识别，尚未读取；后续须核版本/器件与正式版差异。PMC列出Supplementary Text、FigsS1–S11、TablesS1/S2，并不能据目录认定其中有数值原始数据。

## 方法与图表：已定位、尚未录入的候选事实

| 位置 | 原作正文/图注给出的范围 | 下一步约束 |
| --- | --- | --- |
| 设计及实验结果 | D20μm、NA0.5/0.7；400–800nm设计/模拟，实际只测442/509/560/600/623/646nm | 受CMOS限制，不能把400–800nm写成完整实测连续带；不同NA分器件，精确设计f/层数/材料待核 |
| 实验结果、Fig3A/B/C图注 | 实测焦点变化小于3μm；图C为两NA焦位曲线，z从样品顶部量起 | 小于3是界限，不是精确3μm或逐λ焦距；参考范围/基准面、原图轴与数表继续核，不估读 |
| Fig3A/B图注 | 第一/二/三排为实测xz、xy及白虚线剖面，第四/五排为模拟 | 逐λFWHM及PSF方向须回原图/SI/数据核；不从图注推导原始数组 |
| 实验结果、Fig4A/B图注 | NA0.5实测效率22.5–42.7%，NA0.7为13.3–22.1%；效率和FWHM在对应NA的同一焦面比较 | 不把区间端点配给未知λ，不默认逐λ最佳焦；焦圈与功率分母/采样待核 |
| 同上 | 模拟效率24.7–74.2%/14.6–26.1%，模拟均值44.2%/20.0% | 与实测区间分开；模拟均值不能填实测平均效率 |
| Fig4C图注 | NA0.5，白光及450/532/633nm滤波USAF成像 | 滤波RGB不同于六个PSF谱点，633nm不改写成623或646nm；系统条件另记录 |
| 制造可行性比较、指向S7 | 原设计和level1结构的PSF/MTF比较位于数值结构讨论 | 未核S7原图，不能称实测MTF，更不能填数字表；须核方向/单位/归一化/频率轴 |
| Data and materials availability | 作者说明结论所需材料见论文及补充材料 | 继续查SI、Source Data/作者关联仓库；不是默认按请求获取，也不据此断言原始PSF公开 |

## 批判、迁移与下一步

优先取得并视觉核Fig3/4和正式SI，确定两个NA器件的设计焦距、结构、实际采样与效率协议；再查原始PSF/焦位/效率/MTF数表及数据仓库。逐λ数据若仅有曲线，保留图号、轴、证据边界和空数值；不把读图估值当作者原始数据。若需从实测PSF复算，必须先有像素尺度和处理条件，计算值单列并保留来源/输入/公式。

本批完成后仍按原始证据继续扩展经典与近期文献，手机/XR维护和现有开放PR不混入；持续目标保持active。
