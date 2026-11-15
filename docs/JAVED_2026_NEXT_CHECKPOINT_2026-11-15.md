# Javed2026：近期双模式与轴向容差器件的检查点

QUALITY-001s；2026-11-15。接续可见光经典Avayu2017批次，下一篇优先近期新增实验；篇名/批次不写入持续目标正文。

[Javed et al., Twin-Lever Multifunctional Meta-Optics With High Longitudinal Tolerance](https://doi.org/10.1002/advs.77477)，Advanced Science，**2026-09-16**线上ahead of print，文章号**e77477**，DOI **10.1002/advs.77477**。作者Crossref登记/正式PMC题头日期一致，卷/期未登记，不臆填。选择理由是近期单层双模式、偏振可编程、可见光八谱点实验及口径控制轴向最大强度位置；不以标题的achromatic/chromatic-aberration-free声明代替实际焦差核验，不使用引用量/IF。

最新data/题录及只读08_references按DOI/Twin-Lever题名检索无器件记录；这次为近期原始研究定向搜索，不冒称Avayu对其引文或已核直接引文链。

## 实际入口与读取边界

- [Crossref主DOI](https://api.crossref.org/works/10.1002/advs.77477)：独立无头Chrome200，核题名、作者、日期、文章号和正式PDF/XML地址；只是元数据。
- [Wiley原页](https://advanced.onlinelibrary.wiley.com/doi/10.1002/advs.77477)：本机Chrome403/验证页，不称已读该页全文。
- [PMC存档](https://pmc.ncbi.nlm.nih.gov/articles/PMC13583116/)：本机独立无头Chrome**203**返回真实题头/正文/方法/参考/附件链接，62167字符，不是验证页。另一路网页工具仅返回reCAPTCHA，二者实际结果分别保留，不能由工具验证页否定本机所获正文。
- 只读PMC摘要、§5.1制备/§5.2表征、Supporting information和Data Availability Statement，未完整拆解设计或视觉核Fig.1–6，未录入任何新器件/数值。
- Europe PMC公开检索请求本次60秒超时，全文XML入口500；这是访问结果，不等于无存档。现有PMC203正文仍可用于有限阅读，不重复触发任何部署。
- 正文链接的主PDF `ADVS-9999-e77477.pdf`、SI `ADVS-9999-e77477-s001.pdf`和`ADVS-9999-e77477-s002.docx`用本机Chrome独立request实查均403/358字节；未取得有效PDF/DOCX，不填写这些文件SHA或声称已读附件。Supporting File 1/2在正文标签与存档s001/s002扩展名顺序不同，后续须按实际内容辨认，不能仅按序号猜材料。

实际正文/链接快照在`/tmp/lens-mtf-audit/url-aHR0cHM6Ly9wbWMubmNiaS5ubG0ubmloLmdvdi9hcnRpY2xlcy9QTUMxMzU4MzExNi8.json`。403下载响应没有保存为伪PDF。

## 已定位的下一步

1. 对照设计与实制配置，核口径/截光口径、NA、设计f、不同模式/拓扑荷/偏振和aperture-weighted axial bias；区分长焦深/最大强度位置变化与严格逐λ残余焦差。
2. §5.2给实际八λ：488/510/532/555/576/598/610/633nm，Supercontinuum+LLTF带通，LCP/RCP制备，继像QWP+LP滤除未转换光。聚焦效率分母必须保留转换通道选择，不能把选偏振后的透过率当整器件总效率。
3. §5.1名义a-Si400nm、fused-silica基底500μm，Cr40nm为后去除掩膜。正式图/附件未核，暂不预填数据库。
4. §5.2轴扫采用100X物镜/TTL180继像至sCMOS，继像系统与相机置于电动位移台；正文说明background subtraction/flat-field correction。仍须核步长、像素到物方标尺、固定/最佳焦面、原始PSF、FWHM/MTF定义及处理条件。
5. Data Availability Statement称相关数据由通讯作者按合理请求提供；尚未系统查作者数据仓库/期刊Source Data，未联系作者，不声称无公开数组。

下一步先取得/核对可读原始图和附件，确认实际配置与焦位参考，再录入；曲线不估值、未知留空，作者计算与本库复算分开。长期目标保持active。
