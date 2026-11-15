# PMC新云补检：Chang MTF与Javed模拟焦位

QUALITY-001u；2026-11-15；基线`cd58b76`，分支`codex/pmc-supplement-evidence`。本批补已有研究的原始材料，不增加论文或实物数量；长期目标保持active。开始时本地/远程main一致，开放#69/#86保留。

## 定位与新入口

[PMC旧OA公告](https://pmc.ncbi.nlm.nih.gov/tools/oa-service/)确认旧接口2026-08停用；旧`oa.fcgi`404不代表论文/附件不存在。[官方Cloud说明](https://pmc.ncbi.nlm.nih.gov/tools/pmcaws/)及[README](https://pmc-oa-opendata.s3.amazonaws.com/README.txt)给出无需账户的HTTPS逐文件目录/JSON。上一批Colburn2018已用此入口实际取得13页SI并阅读，不是只看OA标志。

本批首先执行用户指定的Chang2024 400μm/NA0.02器件MTF补检，再利用同一路径补此前SI403的Javed2026。两篇均已入库，不新设study_id。不联系作者，不改用户只读08_references，不重复计同字节附件，不用引用量/IF。

## Chang2024：新云附件仍是原来的曲线材料

DOI **10.1038/s41467-024-53701-8**。[JSON](https://pmc-oa-opendata.s3.amazonaws.com/PMC11544246.1/PMC11544246.1.json)与[非截断目录](https://pmc-oa-opendata.s3.amazonaws.com/?list-type=2&prefix=PMC11544246.&max-keys=100)实际200：version1、同题/DOI、非作者稿/非撤稿，`IsTruncated=false`，10对象（主文JSON/XML/TXT/PDF、4主图、两MOESM）。本轮只实际下载两MOESM及JSON；不冒称重读新云主PDF/XML。

| 文件/正式位置 | 实际字节 / MD5 | SHA256与内容处理 |
| --- | --- | --- |
| [41467_2024_53701_MOESM1_ESM.pdf](https://pmc-oa-opendata.s3.amazonaws.com/PMC11544246.1/41467_2024_53701_MOESM1_ESM.pdf) | 3353891；`d55aea74a625a2158096eba9966fd3d9` | `ffd9cd70b5cce3039855dd285bcc51036ff133273a593c5de54bf3cefec328c0`；与此前期刊/只读库24页SI逐字节一致；0嵌入附件。 |
| [41467_2024_53701_MOESM2_ESM.pdf](https://pmc-oa-opendata.s3.amazonaws.com/PMC11544246.1/41467_2024_53701_MOESM2_ESM.pdf) | 2669476；`ab588e41e945fb58cb75b421fe1f8bcb` | `3e0e223c5ce5fb30ea765e507fc836ab4fd2019130b90830e1c5284ed1aeb12d`；与此前期刊审稿材料逐字节一致；0嵌入附件。 |

实际PDF魔数与官方JSON MD5均匹配。相同内容复用[2026-11-14完整有范围核查](CHANG_MTF_DATA_AUDIT_2026-11-14.md)，不把再次取得相同PDF称为新读取或新测量；旧source日期保持11-14，新云子来源及本格补检日期11-15。

仍只有SI Note S5 **p.6**方法和Fig.S6 **p.17**七λ **400/450/500/550/600/650/700nm**的切向（蓝）/弧矢（橙）/理想（黑）曲线。横轴Spatial Frequency(cycles/mm)，标0/50/100，纵轴MTF(a.u.)0–1。作者由实测2D PSF取傅里叶模；归一化公式、场点、S/T–相机x/y映射、焦面选择、物方μm/pixel及裁剪/背景/窗函数/补零仍缺。没有本库复算。

新云清单没有独立数表/PSF对象，两相同PDF没有附件；这只是该版本的有界公开补检。出版方Source Data/作者NanoLight条目/DataCite/Zenodo/GitHub及Figshare访问结果仍以旧审计的真实日期/范围为准，未在本批伪称重查全网。作者Data availability仍为向通讯作者合理请求。`author_numeric_mtf/raw_psf/independently_recomputed_mtf`继续null，仅增加可点击镜像/核验记录。

## Javed2026：取得主文及两个SI版本

DOI **10.1002/advs.77477**；2026-09-16线上/e77477。[JSON](https://pmc-oa-opendata.s3.amazonaws.com/PMC13583116.1/PMC13583116.1.json)200/1866字节，同题/DOI、version1、非作者稿/非撤稿；[清单](https://pmc-oa-opendata.s3.amazonaws.com/?list-type=2&prefix=PMC13583116.&max-keys=100)200/非截断15对象。此前PMC常规PDF/SI request403的历史保持，不能再称当前SI未取得。

| 正式对象 / 实际内容 | 字节 / MD5 | SHA256 |
| --- | --- | --- |
| [PMC13583116.1.pdf](https://pmc-oa-opendata.s3.amazonaws.com/PMC13583116.1/PMC13583116.1.pdf)，13页正式主文 | 2731280 / `336a0d990bb78b757e515f96f0814180` | `b5c2e239120a2aee9bf816fc51cb1d22afe60e5e8f5bc48d5e8ca5253ea3a101` |
| [ADVS-9999-e77477-s001.pdf](https://pmc-oa-opendata.s3.amazonaws.com/PMC13583116.1/ADVS-9999-e77477-s001.pdf)，13页Supporting Information | 1125766 / `b4c317e44b87e9684080fe657559ba84` | `5d66366d441f80b6f5a6990b9febf2d23a1ebe95960504695ad05e4019c298b8` |
| [ADVS-9999-e77477-s002.docx](https://pmc-oa-opendata.s3.amazonaws.com/PMC13583116.1/ADVS-9999-e77477-s002.docx)，同SI的Word正文/表 | 4920900 / `ca34e13a68fd5c8c45091425d80e23e8` | `be646d10def1e1943d8699470408d7b57df51f1df9b25f10e27ac6307c3cae95` |

三文件均实际200、有效PDF/ZIP、官方MD5匹配并算独立SHA256。主文p.13将Supporting File1写DOCX、File2写PDF，与PMC s001/s002扩展名顺序不同；按实际内容确认，不能凭序号判断数据角色。

读取范围：主PDF p.4 §2.1.1/相关公式、pp.7/10–11实验/方法/Data Availability及p.13附件名，实际视觉核pp.4/7/11；SI §I–VI正文/图注/表和参考，视觉核p.6 Tables S1/S2、p.10 S6、p.11 S3/S7、p.12 S4，未声称逐图看过S1–S5。Word只读`word/document.xml`正文/表、关系与对象清单，不声称渲染Word版面；视觉依据正式SI PDF。Word第5个`w:tbl`（前两个为公式表）与PDF TableS3六行数值逐项核一致。

### 方法与图表解读

1. **纠正NA表达式**：主PDF p.4 Eq.5/6紧随文字是`NAmax=2/√5≈0.8944`，此前网页纯文本误读成2/5=0.4，本批纠正所有1mm相关说明。仍是径向分布设计参数，不成为实测有效NA。SI p.12 TableS4另列This work≈0.33，未明确归1mm实物或20μm模型；不选比较表值填实物NA。原主文p.4明确20μm对照模型NA0.33/f28.19μm/设计λ560nm，保留模型归属；没有按公式反算实验焦距。
2. **不能把Measured表头当实验**：SI §III说明numerically investigated，TableS2内部明确Simulations；S1/S2的Measured/FMeasured列仍是数值分析结果。S1/S2存在口径/行配对及数值差异，本批仅记录性质/位置，不从这些表填1mm逐λ实测f，也不扩造一批实物。
3. **TableS3的16个直接数值**：SI p.11与S7图注明确模拟，主文p.4绑定两个20μm模型。模型实际列为488/510/532/**554**/576/598/610/633nm，554不能改成实验555或设计560。单列`simulated_focal_um`，`basis:model`、作者计算、最大轴向强度面；原点、网格/轴步长、插值、偏振未独立说明。x/z轴为μm；不继承1mm相机/采样协议。
4. **Focal Shift/DoF边界**：S3直接正值shift保存在`chromatic`原述/元数据，未给完整参考/符号公式，不生成本库有符号焦差。与设计f28.19μm仅做一致性检查，双曲若干列相差0.01μm，保留原印值，不覆盖作者2.79等数。DoF行未单印单位/阈值，保存原述及`unit:null/threshold:null`，不建DOF数值轴；DoF不是残余色差。
5. **实验575/576差异扩大**：新SI p.10 FigS6a装置图注为575nm，主PDF p.7/§5.2 p.11及Fig4/5为576nm；已有全孔RCP/LCP两行也改为null/待核，保留旧稳定行ID，不代表裁定576。汇总把7个无争议谱点与两份完整原列表分开；原截光Fig6的同类冲突继续保留。19%@633nm未受影响。SI S6b核CL缩束/Da=D/4，不是新250μm制成透镜。

| TableS3模型块 | Focal plane (μm)，按上述八λ顺序 | 作者Focal Shift (μm)，同顺序 |
| --- | --- | --- |
| Our Designed Metalens | 27.61, 27.29, 27.69, 28.50, 27.02, 25.72, 24.49, 24.44 | 0.58, 0.90, 0.5, 0.31, 1.17, 2.47, 3.69, 3.75 |
| Hyperbolic Metalens | 25.39, 24.91, 24.59, 23.57, 22.96, 22.36, 21.96, 21.47 | 2.79, 3.28, 3.59, 4.62, 5.23, 5.83, 6.23, 6.72 |

### 局限、原始数据与后续

完整15对象目录未列原始PSF/MTF数组；SI PDF的44个嵌入XML实际抽出，全部根节点MathML math，是公式而非实验数据。Word有8媒体图、44 Office Math公式、无`word/embeddings`；11外链为作者邮箱/参考DOI，无新数据仓库。主文/SI无数值MTF或原始2D PSF/z栈；表S3焦位不够复算MTF。作者Data Availability p.11仍为合理请求。只限这些材料，不声称全网无数据，也未向作者发信。

1mm器件逐λ精确实测峰位/宽度/效率表、完整ROI/分母校准、物方采样/轴步长/处理及原始PSF仍缺。长焦深、近重合宽峰与模拟改进均不能证明实验零残余焦移或全场无横向色差。S4其他论文数据只作引文定位，数值不抄入数据库。

下一篇沿本次实际读到的SI p.13 ref.7查 **Du et al. 2025, Full-color quasi-achromatic imaging with a dual-functional metasurface**, DOI **10.1021/acs.nanolett.5c00695**：先核原作/附件、制成器件与实际RGB/连续谱性质，再找PSF/MTF/逐λ残差及效率协议。尚未读该原作，不预填S4比较表数字；若受限仍按有界来源记录，继续其他代表作。

## 录入与验收状态

0.3.18候选：新增Javed同两个模型16行，Javed共47行/6配置（非新增实物）；全库**25研究/110配置/809记录**，可见光**21研究/746记录**；设备材料89，文献44/三域83字段。实测f仍19、逐λ效率99、作者平均效率8不增加。新增7个材料入口，主文/SI/Word仍各归同一论文编号。补NA表达式与波长冲突，其他研究旧数值逐行比对未变。

本地校验/241测试/构建与diff检查通过。独立无头Chrome已核16模拟点、633nm的24.44/21.47μm投影读数与原19%效率、47行6配置8材料/Javed及7材料/Chang引用往返、冲突/缺值、CSV/分享、全量/可见光和六视口；七新来源实际200且文件逐字节匹配，无脚本错/溢出，桌面/320截图已看。横轴波长标签改为“当前波长（性质见说明）”，避免模拟谱点被称测量。实际PR/Pages/线上验收待完成，001u暂保留in_progress。数据/图片仅在`/tmp/lens-mtf-audit`，不提交全文。
