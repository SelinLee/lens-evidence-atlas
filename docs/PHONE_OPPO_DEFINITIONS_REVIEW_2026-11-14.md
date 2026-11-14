# OPPO逐模组规格与手机定义来源

DEVICE-006 / FOCUS-001–002，2026-11-14，候选v0.2.5。仅主动处理手机/XR；get_goal已确认新正文及active状态，取代此前暂停的旧运行器目标。5款手机15个后摄配置、8款XR、27字段；本批新增OPPO及AF/OIS字段，非完整市场覆盖或独立质量测试。

## 宏观定位与材料范围

[OPPO Find X10 Pro Max Global (CPH2913)](https://www.oppo.com/en/smartphones/series-find-x/find-x10-pro-max/specs/)：直接读Camera / Rear与Front、相关视频规格文本，不从图片或搜索摘要转录。按厂商规格收录；未验证所有地区版本、对焦速度或防抖档数，不称最优。

定义资料：Hollows & James的[Edmund Imaging Resource Guide §2.1](https://www.edmundoptics.com/knowledge-center/application-notes/imaging/lens-iris-aperture-setting/)，以及Konijnenberg、Adam、Urbach的[TU Delft Interactive Optics / The Thick Lens](https://interactivetextbooks.tudelft.nl/interactive-optics/content/Chap2_Geometrical_optics/GeometricalOptics_2022_01Clean.html#the-thick-lens)。前者为原厂技术说明，后者为在线学术教材；不是手机实测论文，不支持具体产品质量排名。读取相关段落而非全章精读。

## 方法拆解与落库

| 模组 | 名义MP | F数 | 厂商FOV（方向未明） | 明示支持 |
| --- | ---: | ---: | ---: | --- |
| Wide angle / 主摄 | 200 | 1.5 | 84° | AF、两轴OIS |
| Ultra-wide angle | 200 | 2.2 | 124° | AF；未列OIS不记为“不支持” |
| Telephoto | 200 | 2.1 | 34° | AF、两轴OIS |

每值绑定Camera / Rear的相应模组。未知传感器尺寸、真实/等效焦距、SFR等保持缺失，不把三颗200MP相加为系统输出像素。3.2MP多光谱辅助相机及50MP前摄不塞进当前三后摄选择器；未来要扩模组时再收录。没有用FOV推算焦距，也没有用宣传的数字变焦建立额外模组。

F数：Edmund Eq.1为焦距与有效孔径直径之比；有限工作距离段/Eq.2强调工作F数区别。仅纳入几何定义及适用条件，不将简化共轭近似当所有手机镜组精确公式。

物理焦距：TU Delft “The Thick Lens”正文说明用H1/H2作为物/像空间坐标原点；用于提醒真实焦距的参考面与机械后表面/工作距离不同。这个出处不证明Apple等厂商焦段的35mm等效口径，未核的字段仍保持厂商原文边界。Stops段虽有f/D公式，却使用exit-pupil表述；未拿此段覆盖现有有效孔径/入瞳约定。

## 图表与量纲检查

厂商本轮只核规格文字，不从产品图片推断镜组或传感器。教材关键参考面图的视觉范围记录在本轮日志。F数无量纲，FOV为角度，焦距字段为mm但须保留真实/等效口径。AF/OIS是非数值支持声明，不进入双数值轴；两轴OIS不当成“2档”。算术边界：真实f=6 mm、D=3 mm时N=2；改用未知等效焦段会改变含义，因此不对当前手机样本反推入瞳。此为定义例，不是实验。

## 批判与迁移

ISO 12233:2024 OBP普通网页仅JavaScript外壳，独立Chrome无头遇Cloudflare验证；停止该路径，不把搜索片段当已读标准。Nikon MTF页本轮读取超时，不刷新旧源读取日期。SFR/MTF仍需合法可读的正式定义、单位/锐化/RAW-JPEG协议，以及带条件独立测量。

引用实现：device metric可含definition_refs（source、location）；校验拒绝悬空来源或缺定位。定义区可直接跳到所读来源，来源面板包含定义证据，即使选中型号没有相应值。旧无引用字段明确“待补证”，未将一次定义增量称为整个词典完成。

108项测试、构建和本地Chrome四视口验收通过；表格单元格设置最小宽度并提供键盘横滚区域，避免全指标时挤成逐字竖排。待PR及实际Pages验收；完成后在日志追加最终状态。下一步优先补手机质量测量定义/协议和XR PPD等角分辨字段，继续先进型号检索，不恢复其他领域研究。
