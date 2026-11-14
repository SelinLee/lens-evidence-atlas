# 数据契约

`entity.schema.json` 是编辑器可用的基本结构契约。跨文件引用、排序依据、同条件比较、最佳声明限制由 `scripts/catalog.mjs` 的语义校验实现，并由反例测试覆盖。运行 `npm run validate` 与 `npm test`；JSON Schema本身不证明科学结论。

本轮核验基准的每个 `parameters[]` 必须有 `evidence: {source_id, location}`，且来源属于该记录。`corpus_best` 需有唯一的 `cohort_record_ids`、`comparison_keys` 与 `comparison_protocol`；候选必须同应用，并有完整一致的 `comparison_conditions`。这些字段只承载审核协议，不自动生成数值排行榜。

本库最优的 `comparison_keys` 还必须包含指标的全部 `required_conditions`，填写 `as_of`、`checked_on`、`selected_record_id`、`comparison_parameter_name`。每个候选对应参数需有匹配 `metric_id` 与定位来源；展示值必须等于选中记录参数值。上述检查不自动证明候选数值的科学可比性或最大/最小关系。

可选的参数 `metric_id` 一旦提供，必须指向本记录所属应用已列出的有效指标；即使不是 `corpus_best` 的候选也要校验。

## 设备与文献器件矩阵

`data/devices.json`的domains可扩展，并可声明name/category/row_unit；新文献器件沿用统一散点/表格/引用模板。研究行用evidence_type=study、study_id、measurement_scope，同一器件不同谱点用specimen_id关联，不计为独立研究。

研究每格必须有source、location、note、basis；basis区分reported_configuration、measured、model、derived_from_measurement、reconstruction。实测PSF计算、模拟MTF与实验重建PSNR不能都标为measured。`value=null`配display可保留原文界限、冲突或曲线入口，不参加坐标绘制。均值可保存statistic=mean及uncertainty={type:SD,value,n}，原文±与样本量须保留；SD不是CI。语义校验由scripts/devices.mjs执行，不替代科学复核。
