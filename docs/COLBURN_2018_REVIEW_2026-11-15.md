# Colburn2018：EDOF、实测PSF计算MTF与数字复原

QUALITY-001t；2026-11-15；基线b972ee6，分支`codex/colburn-2018-psf-mtf-evidence`。上一批Javed2026已发布验收；初始工作区干净、远程一致，开放#69/#86不混入。上一目标回合有实际数据发布进展，本轮继续active，单篇/访问缺口不改变长期目标。

## 定位、选择与阅读范围

[Colburn, Zhan & Majumdar, Metasurface optics for full-color computational imaging](https://www.science.org/doi/10.1126/sciadv.aar2114)，Science Advances **4(2),eaar2114 (2018)**，2018-02-09。正式参考24确实列出Avayu2017（Nat.Commun.8,14992），作为其后续引用扩展；纳入理由是早期可见光裸镜/EDOF/单一数字滤波实测，对准PSF/MTF与色散影响问题。不使用引用量/IF。最新data/题录及只读08_references按DOI/完整题名无器件记录重复。

取得UW作者托管正式排版7页PDF（6页文章加出版信息页）、官方PMC云6页主文及13页正式SI。限定读摘要、主文pp.2–6设计/相关结果/方法/数据声明/参考24、SI §1–5及相关图注；视觉核主文pp.2–5 Fig.1–4/相位式/单位、SI p.3 SSIM/MTF式、p.8 S4/S5、p.9 S6、p.10 S7、p.11 S8、p.12 S9、p.13 S10。没有逐篇阅读参考文献，S1–S3仅相关图注/方法文字，不声称逐图精读全部SI。

arXiv:1802.03791v1为同篇作者版，20页/855521字节，200取得，SHA256=`768057128c2306deb0dcdff7d9444849857fa28d0a66b4ce22af662110b60f68`；只核题名/版本及关键词定位，其为主文/参考，不含正式13页SI，未将作者版数值替换正式版。arXiv页面只有v1（2018-02-11），不增加第二篇文献。

## 官方云入口与文件核验

PMC旧OA API本次404。[官方公告](https://pmc.ncbi.nlm.nih.gov/tools/oa-service/)确认该服务于2026-08停用，[官方Cloud说明](https://pmc.ncbi.nlm.nih.gov/tools/pmcaws/)和[README](https://pmc-oa-opendata.s3.amazonaws.com/README.txt)明确新的逐文件匿名HTTPS入口。沿正式文档查询`?list-type=2&prefix=PMC5817919.&max-keys=100`，实际仅version1、10个对象，未扫全桶或使用登录资料。

[官方JSON](https://pmc-oa-opendata.s3.amazonaws.com/PMC5817919.1/PMC5817919.1.json)200，核DOI/题名、`is_manuscript=false`、`is_retracted=false`、CC BY-NC和文件MD5；不是只凭版本号选择VOR。实际下载主PDF/SI的MD5均匹配官方清单，再独立算SHA256。

| 材料 | 页数/字节 | SHA256 |
| --- | --- | --- |
| [UW正式PDF](https://labs.ece.uw.edu/amlab/Papers_Journals/Shane_Full_color_imaging.pdf) | 7 /571626 | `88dba7698443995f5e09baa3a310ca5b82d2850d921e81145e858b7882cdf8cb` |
| [PMC5817919.1.pdf](https://pmc-oa-opendata.s3.amazonaws.com/PMC5817919.1/PMC5817919.1.pdf) | 6 /527373 | `5982b5abc74a019ff5a09f8ccaec2acd7d284485606f784cb1c8d69e5e4b2856` |
| [aar2114_SM.pdf](https://pmc-oa-opendata.s3.amazonaws.com/PMC5817919.1/aar2114_SM.pdf) | 13 /1557563 | `92fc4ee971c580cef913e278a13afee812f648ad362c1108ef284e3bffa2f719` |

文件仅`/tmp/lens-mtf-audit/colburn2018-*`，不提交全文。两个正式主文的关键文字200μm、63/57%、579cycles/mm及0.209已互核；视觉核使用UW版，未声称PDF字节或每像素相同。PMC旧SI下载路径403与新云文件200分别保留。

## 方法、图表与逐格边界

该方案让PSF在设计像面随波长较稳定地模糊，再以测得的单一核做Wiener复原；不能把处理后清晰图像解释成裸镜逐λ最佳焦距相等。主文Fig.1D/E是模拟轴向图，实际PSF/MTF在Fig.2与SI S8；主文不提供逐λ实测最佳f/残余焦差表。

| 位置 | 已核事实 | 入库边界 |
| --- | --- | --- |
| 主文p.2设计段、p.4 Discussion | 两镜α0/55π，设计f200μm@550nm，口径width200μm；EDOF系统NA约0.45 | μm已视觉核，文本提取误成mm不采；NA0.75是40X继像物镜。普通镜NA未单列，不直接复制EDOF值。 |
| 主文p.2/p.5制备 | SiN柱height633nm、period400nm、熔石英基底；10级相位 | 临时Au/Pd8nm和Al掩膜移除，不计入成品高度；附加α的独立几何未给，不默认全同。 |
| 主文p.3 Fig.2、SI p.8 S4 | 实测LED455/530/625nm；40X Nikon Plan Fluor NA0.75/WD0.66mm、ITL200、MU300，相机暗噪声序列扣除 | 参考面以绿光530nm对焦（S8）；不是三个逐λ最佳焦面；物理z、步长/物方像素、归一化/裁剪、独立重复未知。 |
| 主文Fig.2D/H、SI §4/S8 | 作者取实测焦斑傅里叶变换的模值为MTF；Fig2归一化频率1=579cycles/mm，S8直接cycles/mm | 方向/S-T、截取或径向平均、DC归一化细节与原数组缺失。579仅作者标尺，不当实测截止/MTF50；不从图估值。 |
| SI pp.3–4 §4、p.11 S8 | 530nm解析衍射极限、0nm/30nm谱宽模拟、普通镜/EDOF实测比较；30nm模型截止约900cycles/mm | 模拟与作者实测计算分开，不把900或理想极限当实验值。作者解释离散采样/10级相位、测量失焦/制备会降低实验曲线。 |
| 主文p.2效率段、SI p.13 S10 | 作者三LED谱点平均效率普通镜63%、EDOF57%；每LED重复3次、误差棒95%CI由SD传播 | 不是400–700nm连续积分平均。逐λ实测点/CI只有曲线，星号为理论；不读图配值、不把n3变3片透镜或跨谱均值误差。 |
| 主文p.5 Device characterization | 818-SL功率计，焦面功率/入射功率；分母透过玻璃、针孔成像区域width匹配器件 | 分子ROI半径/直径、针孔确切尺寸/传递标定未给齐，不补3×FWHM等焦圈。 |
| 主文Fig.3/4、SI S5/S7 | 普通直拍、EDOF直拍、Wiener复原、TV复原分开；数cm物距，纸面物体受离轴LED照明 | 物面照明角不是镜片已知入射场角。无PSNR或dB SNR；只展示部分图像，不扩全视场结论。 |
| SI p.3 §3 | 普通直拍蓝对同系统红图SSIM0.748；EDOF复原蓝对同系统红图0.956 | 红图不是真值，不能当对完美图像的精度。SI图号3A/3C与正式布局3C/3E不一致，按段落文字定位，未复算。 |
| 主文p.3及SI §3 | 作者称SSIM提高0.209 | 已印三位数相减0.956−0.748=0.208；完整精度未给，不改原值或把差异当本库重算指标。 |
| SI p.9 S6 | S6A列α0/20π/40π/60π白光复原；S6B列0/40π/80π绿MTF | 20/40/60/80π分附加结构；40π图像/MTF分条件，不把60与80混成同镜。该图中心λ/独立几何未单列，不继承55π效率。 |
| SI §1及S6 | 作者将高α较低MTF与较低SNR关联 | 仅保留定性解释；没有噪声谱/信号归一化，不能由MTF曲线直接计算dB SNR。 |
| SI p.2 §2、p.10 S7 | α55π TV参数λ=10³/5×10³/10⁴；Wiener与TV对比 | λ是正则参数，不是光波长。约20迭代/55.5s对0.56s是作者实现时长，条件未齐，不当系统帧率/延迟。TV不继承Wiener SSIM。 |
| 主文Fig.1、SI §5/p.12 S9 | 模拟400/550/700nm及0/5/10°；RCWA单元系数+复振幅掩膜/角谱传播 | 不是整器件全FDTD（作者明说内存限制）。角度模型不填实际FOV、离轴实测焦位或零横向色差。 |

量纲/极限核验：所见相位式的长度项除以λ，cubic项(x³+y³)/L³为无量纲，α=0回到普通镜。S8解析MTF在频率0为1、2ρ0处为0，ρ0=r/(λzi)具有逆长度单位；不把这个理论极限硬套到实测LED曲线。D200/f200在空气中对应几何NA约0.447，仅核EDOF作者约0.45量级，不写进普通镜NA或实测f。

## 原始数组与公开性审计

- 主文Data and materials availability称评估所需材料在主文/SI，额外数据可向作者请求；未联系作者。
- 正式云清单10对象仅主PDF、JSON/XML/TXT、4张期刊JPEG、SI PDF和索引HTML，没有确认原始PSF/数值MTF或代码。JPEG是合成刊图，不是带完整物方标定的线性相机PSF/z栈。
- [UW作者出版列表](https://labs.ece.uw.edu/amlab/Publications.html)200，条目63同题录回链主PDF，未核该条独立数据链接。
- DataCite精确relatedIdentifier DOI查询200/total1，只有`10.48550/arXiv.1802.03791`同题作者稿，不是数据集；GitHub仓库名/描述精确`"sciadv.aar2114"`0匹配。另按题名/作者+data/repository/github/code检索，未核到本篇原始数组仓库；综述/课程报告/他篇代码不借作本篇数据。
- Science原页403、旧PMC SI下载403、新官方云PDF/SI200、旧OA接口404且官方确认已停用，均按实际访问区分。不能由单入口失败或上述有范围检索断言全网无数据。

仍缺逐λ最佳f/有符号焦差、横向色差、原始二维PSF及空间采样/处理、数值MTF方向/场点/DC归一化、FWHM/Strehl、逐λ效率与CI数字/ROI标定、复原核/参数完整配置。未估读曲线或复算PSF/MTF；作者实测计算与本库结果分开。

## 候选入库与验收

v0.3.17新增1研究、12配置26行：两裸镜各汇总+三LED共8行；普通直拍/EDOF直拍/Wiener各RGB与白光共6行，TV三正则3行；附加20/40/60/80π共5行；两模型及0/30nm谱宽条件共4行。12为光学/处理/模型配置，不是12片独立实物；未给物理重复n，处理/多λ不增加镜片。

新增两作者谱点平均效率63/57%、两跨颜色SSIM0.748/0.956；原始逐λ效率99、实测f19保持。NA对平均效率有效点6→7（普通镜NA空），全库作者平均效率记录6→8；总25研究/110配置/793行，82设备材料；可见光21研究/730行。43文献/三域82指标保持。

本节后续补实际校验/PR/Pages与独立Chrome验收；未完成前001t保持in_progress，长期目标active。新官方云入口也为此前无法取得的材料提供下一轮补检路径，不能把旧访问结论当永久状态。

共享指标ID保持不变，SSIM列名改为“图像SSIM（参考/处理见说明）”，避免把普通直拍结果标成重建；平均效率列名/定义明确波段或已测波长集合及统计条件，图点标签保留“三LED平均（非全谱积分）”。既有Tseng等重建结果仍按各格性质保留，未改历史数值或分享轴ID。

本地校验/构建、234项测试、diff检查通过。独立无头Google Chrome核两作者平均效率63/57、两跨色SSIM0.748/0.956与投影/点进表、约NA标记、26行12配置5材料同编号/引用往返、CSV/分享、逐λf/效率/FWHM缺值、可见光筛选及六视口通过；已实际查看效率/SSIM桌面与320截图，无脚本错误/溢出。全量25研究793行/可见光21研究730行符合。Science403，UW主PDF/官方主PDF/SI/元数据均200，PDF魔数/三个SHA与JSON身份核通过。报告仅`/tmp/lens-mtf-audit/colburn2018-qa-local.json`。待PR/Pages线上验收。

## 实际发布验收

PR [#116](https://github.com/SelinLee/lens-evidence-atlas/pull/116)头`ca83d118925e1fed43b2ebed3e127da5227cfec5`通过CI43667770934，合并`b1217dc850a357a80d74926911cefc6d68e66714`；主线CI43667898844/Pages43667898780均成功。公开12文件逐字节一致，devices-data.js SHA256=`870f14023e6f18a2ef2fc937b009c54f742cc64b221641e00fd79e5fca7cdea2`。

线上独立无头Google Chrome复核两作者谱点均值63/57、两蓝对红SSIM0.748/0.956及投影/图点进表、约NA标记、26行12配置5材料同编号/引用往返、CSV/分享、缺值、可见光筛选和六视口通过；已实际查看线上效率/SSIM桌面与320图，无脚本错误/溢出。全量25研究793行与可见光21研究730行符合。Science403；UW正式主文/官方云主文/SI/JSON均200，PDF魔数/三SHA和JSON身份核。官方主PDF/SI与UW主PDF各查0嵌入文件，未发现内嵌原始PSF/MTF。报告仅`/tmp/lens-mtf-audit/colburn2018-qa-live.json`与`colburn2018-live-hashes.json`。

001t只关闭上述有限核验/录入/发布批次，原始数组、逐λ最佳f/效率/CI数字、方向/采样/ROI及复原完整条件仍缺。已继续[新云入口对此前资料的补检](PMC_CLOUD_RECHECK_2026-11-15.md)，先核用户指定400μm器件；目前仅取得同DOI元数据/非截断10对象清单，没有预填新测量，目标active。
