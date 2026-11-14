# Jeon2026三维RGB消色差与近眼系统：下一批检查点

QUALITY-001o；2026-11-14。接续经典2017工作，补近期实制可见光与VR相关研究，不把单篇安排写进长期目标。最新库/题录按DOI与题名文本检索未匹配，入库前再次去重。选文理由为2026年三维可变柱高/直径、TPL及NIL复制、实测RGB焦斑/MTF与功率表和OLED系统；未用引用量/影响因子或作者“最佳”作独立纪录。

[Youngsun Jeon et al., Differentiable library-based inverse design of achromatic metalens for full-color near-eye displays](https://www.nature.com/articles/s41467-026-73103-2)，Nat. Commun. **17, 6310 (2026)**，DOI **10.1038/s41467-026-73103-2**，正式页2026-05-11上线。由2026可见光实制/PSF/MTF检索定位原作，不从综述抄参数。

## 已取得与实际读取范围

独立无头Chrome正式网页/主文11页/SI42页/附加文件说明1页均200。本机材料仅`/tmp/lens-mtf-audit/near2026-*`，不提交全文。当前限定读摘要、主文p.5设计/表征与p.9相关Methods/Data availability，SI Note15/17及Table2，视觉核主文p.5、SI p.26 S15/p.28 Table2；其他SI只目录/检索定位，未冒称42页全文精读。

| 文件及正式入口 | SHA256 |
| --- | --- |
| [主文](https://www.nature.com/articles/s41467-026-73103-2.pdf)，11页 | `e69608aef0dece91ee838e9c16389d4bbb27803b6a24091d719b3299ea85342d` |
| [SI](https://static-content.springer.com/esm/art%3A10.1038%2Fs41467-026-73103-2/MediaObjects/41467_2026_73103_MOESM1_ESM.pdf)，42页 | `03b6d35cf1e7393043dbc6f0ba2466c7a492b1ec81e6dbfee344fedf79e28b14` |
| [附加文件说明](https://static-content.springer.com/esm/art%3A10.1038%2Fs41467-026-73103-2/MediaObjects/41467_2026_73103_MOESM2_ESM.pdf)，1页 | `5e358b12b9bc28c3127bc2dcd3dce86915c79a9a8bcaf684146af4929d6dd715` |

## 下一步需保留的证据边界

1. 本作是450/532/635nm**离散RGB**，p.5/S8所述410–750nm轴向扫描为模拟带外行为，不能当连续实测消色差。TPL master、NIL复制镜及OLED系统须先核实测归属，不把一组性能复制给所有配置。
2. 主文p.5已定位实测FWHM/Strehl、设计/测量f和功率效率；SI p.28 Table2明确逐色入射/聚焦功率（单位μW，表头虽写intensity仍为功率量纲）及效率，与模拟列分开。完整入库待几何、焦圈、分母/采集条件交叉核验；不能将摘要约33%或模拟优化效率当实测，主文/表中模拟取值差别也须保留。
3. S15(p.26)的MTF来自PSF Fourier transform。b横轴是**Spatial Frequency(f/fc)**，c/d为fx/fc、fy/fc；不能直接改成lp/mm或独立S/T。b中蓝色一行图例solid Sim/dashed Exp，与红/绿solid Exp/dashed Sim相反，须核图/正文而不默认统一。当前只核到曲线，未取得数表或原始PSF，没有估图或复算。
4. 主文p.9 Data availability称由通讯作者按合理请求提供；正式页当前附件列SI、附加说明、两影片及透明审稿，未列Source Data。尚需查作者关联仓库/数据入口及采样/归一化，不能仅凭附件列表宣称全网无数据。
5. 主文称NA0.21，但所列ideal FWHM与其λ/2NA公式的实际取值须继续量纲核对；不能据理想模型改作者NA或用汇总f补三个精确焦距。

**尚未录新研究或新测量值。** 下一批先核主文Fig.3/4与Methods、SI S7/S8/S15/S17及原始数据入口，分别建立器件/系统和谱点记录，通过完整校验/测试/PR/Pages/Chrome后发布。父目标active。
