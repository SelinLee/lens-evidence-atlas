# Khorasaninejad2017可见光反射式消色差：原始证据核验

QUALITY-001n；2026-11-14；基线c4de4fe，`codex/khorasaninejad-2017-evidence`。上批#102/#103已合并、CI/Pages通过且公开12文件一致；本轮初始干净，开放#69/#86不混入。父目标active。

## 定位、选文与实际读取范围

[M. Khorasaninejad et al., Achromatic Metalens over 60 nm Bandwidth in the Visible and Metalens with Reverse Chromatic Dispersion](https://pubs.acs.org/doi/10.1021/acs.nanolett.6b05137)，Nano Lett. **17(3), 1819–1824 (2017)**，DOI **10.1021/acs.nanolett.6b05137**。沿Fan2019参考31纳入早期实制连续可见光消色差工作，兼有实测普通色散与仅模拟反色散对照。最新库/用户文献目录按DOI/题名去重无匹配；没有使用未查询的引用量、影响因子或独立“首次”判断。

本篇针对反射式TiO2柱/SiO2 spacer/Al镜，通过波长参考相位和单元色散设计近似固定焦距；不能与所有透射裸镜默认同协议。研究层按同一发表论文归组，作者稿题名略短及SI组件不重复算研究。

| 实际材料 | 本轮读取范围与版本 |
| --- | --- |
| 正式题录/Crossref；[作者Capasso站正式PDF](https://capasso.seas.harvard.edu/sites/g/files/omnuum6306/files/capasso/files/acs.nanolett.6b05137.pdf)的网页解析文字 | 印刷pp.1819–1823设计/表征、Fig.2/4/5/6图注、讨论与Associated Content。正式作者PDF脚注1819–1824得到核对，但Chrome作者站/ACS均403，没有取得本机正式PDF或视觉核正式版图内文字。正式图注与作者稿的1.5%、2.7μm和六个方向宽度逐项对照。 |
| [arXiv:1701.06696v1作者原稿](https://arxiv.org/pdf/1701.06696v1)，19页 | 2017-01-24由第一作者提交，只有v1；arXiv正式关联DOI，DataCite是IsVersionOf。Chrome200取得PDF；读设计/测量/讨论/文末及图14–19页，视觉核15/17/18/19页的图2/4/5/6。正文1–9相关段已读，参考10–13页只定位。文件不含所称S1–S9。 |
| [公开镜像中的出版社排版稿](https://displaydaily.com/wp-content/uploads/2018/01/achromatic_metalens.pdf)，6页 | Chrome200，仅核对原作本身，不用媒体评论取数；页脚XXXX/A–F，视觉核B–D设计/图2–6、读相关段。与作者原稿图5的f印字一致，但不冒称正式成刊版。没有把镜像另计研究或作作者原始PSF仓库。 |
| [独立SI组件](https://doi.org/10.1021/acs.nanolett.6b05137.s001) | Crossref200明确is-component-of本篇及`nl6b05137_si_001.pdf`文件路径；Chrome403，未取得/读取Note1与S1–S9。主文声称SI免费，访问受限不等于SI不存在。 |

本机仅`/tmp/lens-mtf-audit/`保存原PDF/图片，不复制全文到公开库。arXiv PDF SHA256=`4547f857210a88e8e778eda84aeff4b2fb89c2989a2912cb33a682129a7a31bb`；公开排版稿SHA256=`766ffbc427bd5306a7a96b1233a1b08f7d2a04d50c69db480e8c38b0483c03dd`，4,354,321B，MD5=`ee4b1f0b3519937227ce556f9925e986`，与DASH可公开读取的文件元数据一致。DASH该文件`dash.permission=PRIVATE`，内容401；没有尝试登录或访问私有内容，镜像来自独立公开URL。`/src/1701.06696`响应也是同一PDF，原`.tar`扩展名已改正，不称拿到源代码包。

## 器件、波长与焦面

新增3配置、13条件/曲线入口，非13个独立实物。实制AML为1汇总+7个轴向/最佳焦斑谱点+3个固定像面PSF；GML实测普通色散1汇总；反色散仅模拟1汇总。反色散不计作新实制性能；Fig.6b总体随λ增大，但500→510nm与550→560nm有局部回落，只定性保留，不能称严格逐点单调。

实制AML：D200μm、设计f485μm、作者名义NA0.2；TiO2方柱高600nm、格点480nm、SiO2 spacer180nm/Al110nm/fused silica（正式pp.1820–1821，arXiv pp.4–6/14）。空气几何核对100/sqrt(100²+485²)≈0.2019与0.2相符，不当独立角度计量。工作波段490–550nm为作者连续消色差范围，Fig.4a实际七谱点490/500/510/520/530/540/550nm；设计的六等间隔优化波长不替代实测清单。

| 波长 | 作者最佳f（μm） | horizontal/x FWHM（μm） | vertical/y FWHM（μm） | 具体原文位置 |
| --- | --- | --- | --- | --- |
| 490nm | 491 | 1.29 | 1.27 | arXiv v1 p.18 Fig.5d右下f印字/图注；正式p.1822图注宽度 |
| 520nm | 483 | 1.45 | 1.52 | arXiv v1 p.18 Fig.5e右下f印字/图注；正式p.1822图注宽度 |
| 550nm | 485 | 1.59 | 1.68 | arXiv v1 p.18 Fig.5f右下f印字/图注；正式p.1822图注宽度 |

三个绝对f来自作者稿**图内直接印字**，不是从曲线/色标读峰或本库重建；display保留“arXiv v1印字”。正式PDF的图内f尚未视觉复核，不能隐藏此版本边界。六方向宽度有正式图注和作者稿双重文字依据，属于图5下排各λ最佳焦斑；上排固定z485μm另三行记录，未复制这些f/FWHM。horizontal/vertical可作图像x/y，未定义S/T，不相互替换。其余四个λ绝对f/FWHM继续空值；Fig.2的一般f485@530说明不强作另一个实测点。

## 残余色差、统计与画质

作者Fig.2实测fractional change **1.5%**与模拟1.2%分开。正文公式(max(f)−min(f))/mean(f)×100%位于模拟段；将同名定义关联到实测是**上下文关联**，非原始数表复现，实际mean(f)数值未知。保留说明及分母/参考空缺，不用设计485反推μm变化，也不以三个整数标签复现完整七点统计。

Fig.4a作者跨490–550nm焦距的**SD2.7μm**另设`focal_spectral_sd_um`；这是光谱散布，不是每个焦距的±测量不确定度、DOF或物理样品重复SD。七λ由图标签确认，重复样品数及SD除n还是n−1未给，显式null；不附通用误差条到每点。

`axial_focus_offset_um`为本库由上表作者印字减去**图5a–c作者明确固定评价面z_ref=485μm**，得到490/520/550nm的**+6/−2/0μm**。保留`calculation_origin: atlas`、公式、输入版本、参考面和符号，display注明本库计算；不是作者原始焦移表，不是相对530nm，也不默认选择设计f。正号为最佳焦点z更大，真实零不改空值。未生成其他λ或带内RMS/峰峰焦移。

PSF采集为准直laser、50:50分束、10×/NA0.28 Mitutoyo+f200mm tube lens，再4×Olympus+f180mm tube lens至Andor Zyla；作者以已知尺寸物体核40×倍率。**实际轴向步长2μm**，100nm是平台最小移动能力；二者不同。主文缺光源型号/线宽、实测偏振通道、传感器像元/物方采样与背景/裁剪/峰值判据/归一化细节。图4z轴mm/0–1色标、图5的2μm图中标尺不等于取得原始PSF。拼接实测轴向强度不当数字成像反卷积。

主文把带边二级峰增强归于制备误差，并把相位失配及效率影响指向S7–S9；本轮没有已核SI效率定义或数表，焦圈/分母/校准均未知，不借用其他论文常见约20%/单元反射率。没有取得MTF/Strehl或原始PSF数组，未计算MTF，也未量化焦移造成多少MTF/聚焦效率损失。固定面与最佳面图像相近不证明零残余色差或全场无横向色差。

## 原始数据入口核查

核查日期2026-11-14，范围有限，未联系作者。

| 入口 | 实际结果及边界 |
| --- | --- |
| ACS主文/标准SI、作者Capasso及MURI站、旧站路径 | 独立headless Chrome403；正式题录/作者正式PDF的网页解析文字可读。主文Associated Content只说明SI免费；未核到原始数据获取声明，不能套用“向作者请求”，不能称已完整浏览当前附件列表。 |
| Crossref主文/SI组件 | HTTP200；SI DOI明确is-component-of主文，并给`nl6b05137_si_001.pdf`。只确认身份/路径，不确认SI数值、公开数组或Source Data存在/不存在。 |
| DataCite精确relatedIdentifier DOI | HTTP200/meta.total=1，为arXiv:1701.06696/IsVersionOf，同篇作者稿；不是新原始数据集。 |
| arXiv abs/pdf/src | abs200、仅v1及原始DOI关联；19页PDF200，源入口也返回同PDF，没有取得代码/PSF数组或SI附件；另查`/anc/1701.06696`为404，仅限该入口。通用Code/Data插件开关不当本篇专有数据。 |
| DASH两个实体/下载及API | 实体429，下载200是HTML，公开HTML元数据显示该bitstream私有，内容401；不把HTML冒充PDF，不操作登录。 |
| GitHub插件仓库名称/描述精确DOI尾串和完整题名 | 均空；不是全代码/所有作者账号检索。最初误用fetch到不支持的search endpoint返回400，随后用正式repository search工具取得以上限定结果。 |
| Figshare公共API/组件入口、精确DOI/文件名/题名+data/github网页检索 | 本机入口403/非JSON，不能当零搜索结果；未确认该篇原始PSF/频率表仓库。其他论文数据不借用。 |

仍缺：可读期刊SI及S9效率定义/数表，完整七点f/原始轴向和横向PSF、像素/轴向原点/峰位算法/归一化与重复数、MTF方向/场点/频率单位/评价面与原始数组、横向色差，另需正式版图内f印字视觉核。本轮已取得精确作者标注与作者统计，但不称拿到原始PSF数据或已复现整篇。

## 入库、验证与接续

v0.3.11候选：**19研究/70配置/675行**，可见光16研究/622行；3材料归一个文献编号，设备材料62，41文献/三域80字段。新增3个逐λ作者f（总数15→18）、6个方向FWHM、作者1.5%/SD2.7μm及3个独立标明的本库焦差计算；聚焦效率92逐点/6带内均值保持。193测试/校验/构建通过，反例核跨λ SD与单点不确定度、固定面/最佳面、签名焦差的输入/参考/计算归属与真实零。PR、Pages及独立Chrome验收在日志追加，未发布前称候选；具体下篇放待办/检查点，父目标active。

- 本地独立无头Google Chrome已核13记录/3配置/3材料、三f与有符号焦差（含负/零）/投影、SD/variation及x/y宽度、固定面/模拟/空态、引用往返/分享CSV/计数及六视口；已看桌面/320截图，无页面错误/溢出。arXiv原PDF200/哈希一致，ACS/SI403如实显示读取缺口、Crossref组件身份200；未冒称这些入口已能读取原始数据。Fan2019回归通过；待合并后公开页验收。
