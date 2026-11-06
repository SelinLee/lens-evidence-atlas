# 数据契约

`entity.schema.json` 是编辑器可用的基本结构契约。跨文件引用、排序依据、同条件比较、最佳声明限制由 `scripts/catalog.mjs` 的语义校验实现，并由反例测试覆盖。运行 `npm run validate` 与 `npm test`；JSON Schema本身不证明科学结论。
