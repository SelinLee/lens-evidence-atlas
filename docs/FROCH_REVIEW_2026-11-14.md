# Fröch2025厘米级宽带计算超透镜：原始证据核验

QUALITY-001l；2026-11-14；基线bfac93c，`codex/froch-2025-broadband-evidence`。上批#96/#97已完成实际发布；本轮初始工作区干净，开放#69/#86不混入。父目标保持active，具名论文仅在待办/日志。

## 定位、选择与实际读取范围

[Johannes E. Fröch et al., Beating spectral bandwidth limits for large aperture broadband nano-optics](https://www.nature.com/articles/s41467-025-58208-4)，Nat. Commun. **16, 3025 (2025)**；DOI **10.1038/s41467-025-58208-4**。正式页2025-03-28上线；沿Zhang2025参考8扩展，最新devices/题录未匹配。选择理由是近期实制厘米级可见光器件、波长/场角PSF与系统处理前后线对对比度，可直接补足“大口径的残余色差怎样影响画质”的证据边界。未使用引用量/影响因子，也不接受作者纪录声明为独立纪录。

本作采用EDOF/端到端设计与计算后端，裸镜不在整个波段达到衍射极限，不能直接与物理消色差单镜作相同含义的“无色差”比较。主文、SI归一个研究/一个编号，普通色散hyperboloid和折射镜均标对照。

正式页/Princeton项目页HTTP200；主文10页、SI24页取得。读摘要、设计、实测表征、系统/重建和Methods/Data/Code，视觉核主文pp.2–4/7–8；SI限定Note1、Note3相关段及Note5–7，视觉核pp.2/11/14–18，其他SI只定位/相关文字，未冒称逐页全文精读。另读公开6页透明审稿文本，主要为方法延续性/应用讨论；未核到原始数据链接，不把审稿声明替代测量。

| 材料 / 本机实际文件 | SHA256 |
| --- | --- |
| [主文PDF](https://www.nature.com/articles/s41467-025-58208-4.pdf)，`froch2025-main.pdf`，10页 | `e745b647640b65ff3c5b70e235b51016e93cfd6c2fc4b5f567d46b504e193e7b` |
| [SI](https://static-content.springer.com/esm/art%3A10.1038%2Fs41467-025-58208-4/MediaObjects/41467_2025_58208_MOESM1_ESM.pdf)，`froch2025-si.pdf`，24页 | `080659a4e98e63f6a1bb989cc47fadf5fa0f78b0684fa21388ccbf7197d057da` |
| [透明审稿](https://static-content.springer.com/esm/art%3A10.1038%2Fs41467-025-58208-4/MediaObjects/41467_2025_58208_MOESM6_ESM.pdf)，6页 | `8bc11829be96f845eb424025d7577988b8fba8bbd2a5ab12ebd114795b23e04a` |

文件、渲染图与候选作者文件仅在本机`/tmp/lens-mtf-audit/`，未复制到公开库。数据库的主文/SI两个来源同篇；审稿及归属未核的作者仓库不强加为数值来源。

## 器件与测量矩阵

本批439条**条件/曲线入口记录**，不是439个独立实物或439个新提取的性能数值。10个配置包括5个光学结构/对照、3个线对测量系统及2个成像系统；同一个结构的不同扫描光路用同一specimen关联，系统条件另列。实际物理样品重复数未知。

| 组别 | 位置与本批记录 | 已核参数和界限 |
| --- | --- | --- |
| 折射平凸镜、hyperboloid、EDOF、N2N Poly、N2N Broad | 主文p.3 benchmarking、SI p.14 S9；5汇总+420条件 | 每组21波长480–680nm/10nm×aoi0/5/10/15°。D1cm→10000μm、名义f/2；名义f=F#×D=2cm→20000μm显式换算，折射镜p.8直接给f2cm。NA未直接报告，留空；不是各谱点实测f。 |
| 四种meta-optic结构 | SI p.2 Note1 lines46–50；主文p.8 Fabrication | SiN方柱/石英，高约800nm，period350nm；主文250nm间距为计算内存举例，不能代替实际周期。S7约815nm来自reference marker，约15nm作者归残余AlOx，不替代每个透镜柱高。 |
| 宽带器件轴向扫描 | SI p.18 Note7/S12；6行，仍属broadband结构 | λ450/500/550/600/650/700nm，同轴准直；20×Nikon+TTL180A+GT1930、Newport ILS100CC/ESP301，步长7.5μm，约200×200μm裁剪/峰居中。不是S9直接传感器光路。 |
| 3类USAF系统 | 主文p.4 Fig.2g/h/i与SI p.17 Note6；6行 | 折射镜/hyperboloid/broadband，每个采集与反卷积分开。480–680nm/2nm，共101谱点；并非101个物理器件。场点/角度未逐频率给，不默认aoi0°；g只称单波长，不借用e图580nm绑定。 |
| 环境光相机 | 主文p.8 Measurements；1行 | broadband+ZWO ASI183MC Pro、作者约30°视场（p.2称对角）；400–750nm是除IR滤片范围，不是连续消色差验收带宽。 |
| 双相机/扩散重建 | 主文p.7 Fig.4、p.8；1行 | 两台GT1930c，70/30同轴分光至meta-optic/compound lens；比例不是聚焦效率，图像重建不当光学SNR/MTF。未把ZWO相机视场或其他论文PSNR移入。 |

S9定位按从上λ680nm向下每10nm一行、每结构下4列aoi0/5/10/15°，逐行写进`location`。独立测量波长与设计优化采样分开，未将2000/1000个优化波长或约5nm设计采样称实验谱点。

量纲核对：1cm=10000μm，f/2的名义f=20000μm；空气、几何半角假设得到NA≈0.2425，仅为本库核量纲，不填作者NA，也不把近轴0.25当实测。固定传感器面PSF不说明最佳焦点不动；EDOF图不能产生0焦移。

## PSF、MTF、效率与处理的边界

**固定传感器PSF**：主文pp.3/8，单模光纤点源距镜约50cm、摆臂改变角度并保持距离；SuperK FIR-20/AOTF；GT1930传感器像素作者约5.6μm、镜片至传感器在设计焦面固定。主文p.3明确称照明经准直（collimated），p.8的约50cm是光纤几何距离，不能单凭此认定有限物像共轭；方位角、谱线宽和原始背景/裁剪/归一化未齐。S9公开21×4×5图片，不从其图像估FWHM或绝对焦距。

**轴向强度**：SI p.18 S12 x为Focus Depth(cm)1.8–2.2，y为Position(μm)−100至100，色标0–1。扫描起点由透镜表面确定，但未给逐点峰位/焦深数表与归一化细则；未算残余峰峰/RMS/有符号焦移。不能把7.5μm轴向步长当横向像素，或把5.6μm/20当已校准物方采样。

**PSF-FFT阈值**：SI pp.15–16 Note5/S10b/c，作者取PSF Fourier模值，找MTF低于**0.01**的空间频率；c横轴波长nm，纵轴Line Pair Value Threshold(lp/mm)，5结构×4aoi曲线。0.01是判据，不是0.01lp/mm或MTF50。作者原始数组/频率表、方向、归一化/窗口及频率参照面未完整公开，数值留空；本库没有复算。

**峰值比不当聚焦效率**：S10a将中心像素峰值除以传感器上约5mm直径圆域的总计数，用于定性比较集中程度，分母不是同口径入射功率，也没有标准焦圈积分。该比值不写入聚焦效率或Strehl；单元RCWA透过率>90%也不当全镜效率。

**系统线对contrast**：SI p.17 Note6 **lines381–391**，USAF1951横/纵线对各自平均截面，以(max−min)/(max+min)计算，再平均横纵结果。主文称MTF contrast，但这是方波线对响应，不是独立S/T曲线，也不能不经条件说明替代严格正弦MTF。原图g/h前后反卷积分开；Fig.2i为谱段平均。相机white balance=0、无AWB/gain/sharpening，仍不能声称完全无相机内部处理。误差条作者称平均强度1 SD，重复数/传播未给，不升级CI。

主文摘要100lp/mm处平均20%或更高、<70lp/mm处>30%，p.7的0–70lp/mm均值>30%及折射对照约50%均保留为带协议的作者概述/界限；不分派为特定波长/频率的精确点。空间频率按作者lp/mm保存，物像方/20×继像标定与场点仍缺。未量化残余焦移造成多少MTF/效率损失，因为焦距/原始曲线与功率证据尚不齐。

## 原始数据核查

日期2026-11-14。有范围的公开入口核查不证明全网没有数据，也不把“文件名有PSF”当已匹配原始证据。

| 入口 | 实际结果 / 覆盖边界 |
| --- | --- |
| 正式网页/主文p.8 Data与Code availability | HTTP200，均向作者请求；附件SI、影片和透明审稿，未列Source Data。 |
| 主文/SI上述图表及6页透明审稿文本 | 没有核到本篇逐波长f/FWHM/MTF频率表或可复算的原始PSF；审稿主要论及方法延续和应用，不补采样数组。 |
| [Princeton项目](https://light.princeton.edu/publication/1cm-metalens/) / [Datasets](https://light.princeton.edu/datasets/) | 均Chrome200；项目有Paper/Supplement，无本篇专属数组入口；当前通用数据页仅见Long-Range Trucking。只限所见页面。 |
| [Jipeng Sun研究页](https://jipengsun.github.io/research.html) | Chrome200，该篇条目链正式Nature页，并链作者GitHub账号。 |
| GitHub repository name/description精确DOI尾串与完整题名 | 均空；不是全代码/全账号检索。DataCite精确relatedIdentifier DOI检索HTTP200/meta.total0，仅限有该登记关联的记录。 |
| GitHub插件`user:JipengSun` | 返回52个公开仓库；按PSF/光学相关性读Nano_Dataset、Nano_Diffusion_Clean、NanoArrays、Neural_Nano-Optics的相关目录/README/代码，不声称读了全部仓库内容。 |
| [Nano_Diffusion_Clean](https://github.com/JipengSun/Nano_Diffusion_Clean/tree/817f36bfe58c3bd24e2b650c57b8df3d7e72be7e) | 完整树未截断；README描述通用配对恢复，`experiments/diffusion_1cm_cobi.py`有1cm名称但需外部`--data-dir`。未见本篇DOI/原始PSF/模型权重清单，不把通用训练代码当本篇完全复现。 |
| [NanoArrays](https://github.com/JipengSun/NanoArrays/tree/1e5976b162a0a40d620123a72b954558ac070d9f) / [Neural_Nano-Optics](https://github.com/JipengSun/Neural_Nano-Optics) | 前者为通用non-blind deconv baselines；后者明确属于Tseng2021 DOI10.1038/s41467-021-26443-0及其数据链接，不移用于Fröch2025。 |

### 找到但未通过器件归属核对的PSF候选

[Nano_Dataset固定树e25b992](https://github.com/JipengSun/Nano_Dataset/tree/e25b992cf219acc73980ee45115300dab14c1b9d)未截断，没有README.md（该路径404，不代表仓库不可访问）。有以下公开文件：

| 路径与位置 | 实际检查 | 不能用于本篇MTF复算的原因 |
| --- | --- | --- |
| `PSF/PSF/psf_crop_r.png`，同目录g/b | 三通道blob SHA相同`228afb1bc3fde6a9956e1201b622f48f26ce9cb8`，各648B；r图Chrome200/视觉核，51×51px | 未给对应本篇器件/波长/场点/原始采样或归一化。相同RGB文件不等于三次独立单色测量。该路径历史最近提交`53413bb`于2023-01-09，不能仅据此否定后续使用，但也不能据文件名绑定2025论文。 |
| `PSF/PSF_test/psf_crop_r/g/b.png` | 分别210/283/209B；r图Chrome200/视觉核，21×21px | 不明是否裁剪、重采样、测试核或实测，缺DOI/几何/采样元数据。未将论文约5.6μm像素复制到这些PNG。 |
| `new_backup.ipynb`，code cells3/7 | 原文件2,575,078B；读取代码而未执行，引用`Data/PSF/normalized_psf_601.npy`并构造对称/同通道核 | 树内无该.npy；PNG与.npy及本篇采集之间无明确映射。代码变换不证明图像自身为何种来源，继续列待消歧，不将其当原始PSF。 |
| `lib/util.py` lines65–69；`aruco_calibration_rotation1.ipynb`相关代码 | 函数按文件名读r/g/b；另一个notebook是标定操作 | 没有绑定本篇的物方μm/像素、单色/角度、采集/背景/裁剪说明。另读manually_calibration，未核到所需PSF归属。 |

两个大notebook由GitHub插件返回空content后，使用独立Chrome从同一固定commit读取raw UTF-8；PNG属于插件不支持的二进制，也由Chrome取得。未执行下载代码，未用个人浏览器资料，未联系作者。仓库树、README/文件blob与候选本机副本保留在`/tmp/lens-mtf-audit/froch2025-*`及`froch-author-*`，公开库只存上述定位/结论。

因此：**确实找到作者关联PSF候选文件，但仍未核实属于本篇、带足够采样/处理条件的原始PSF或作者MTF数表**。数据库`raw_psf/author_numeric_mtf/independently_recomputed_mtf=null`仅指本篇已确认材料；不会声称作者网上没有PSF。没有读图估值或自行复算MTF。

## 入库、验证与接续

v0.3.9候选：17研究/63配置/628行，可见光14研究/575行；新增439条件/曲线记录、3字段aoi/PSF协议/线对协议，文献38字段/三域77字段。旧15个逐波长绝对实测f、92逐波长聚焦效率点与5个带内效率均值点保持；本篇未新增这些性能数值。主文/SI一个编号，按期刊/年份/文章号消歧。

项目校验、179测试和构建通过；反例覆盖角度参考/方位/光路、横纵与S/T、处理前后性质及多谱点汇总。本地独立无头Chrome核439记录/10配置、680nm/aoi15°读数/投影、426角度记录/86坐标组、2材料引用往返和实际原始链接、扫描/处理分组、空态/分享CSV/计数及六视口通过；已查看截图，无页面错误/溢出。Zhang2025回归通过。PR/Pages实际结果在日志追加，未发布前不称候选已上线。

下一篇回到2019经典实制SiN阵列：Fan et al., DOI`10.1038/s41377-019-0178-2`（Zhang2025参考13），先核原作和SI；不把其系统3D图像或综述数值代替单镜实测。具体进度进入下一批检查点，长期目标不写固定论文。

- 实际发布：PR #98/781b5d1，主线CI43598969231与Pages43598969229成功；公开12文件一致。线上独立无头Chrome新样本、两轴读数/投影、426角度记录/86坐标组、2材料/引用往返/实际原始链接、空态/分享CSV/计数及六视口通过，已查看截图。原始数组及候选器件归属未因此变为已核；父目标active。

- 最终照明表述复核：固定传感器PSF协议明确区分主文p.3的准直照明与p.8约50cm光纤几何距离；删除容易被理解为已确定有限共轭的措辞，未改变任何测量数值、结构、条件数量或原始数据结论。

- 照明更正发布：PR #100/d853beb，主线CI43599985361与Pages43599985368成功，12公开文件一致，179测试/构建及线上Chrome完整复验（包括导出准直文字）通过。425格协议已明确准直声明/几何距离的区别；本批数字/计数/原始证据缺口保持。
