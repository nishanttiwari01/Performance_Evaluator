const etlQuestions = [
  "Have data volume benchmarks been established for source and target systems?",
  "Is the ETL job designed to handle large data volumes efficiently?",
  "Are transformations optimized to minimize memory and CPU usage?",
  "Are complex joins and lookups minimized or optimized?",
   "Is partitioning or parallel processing used where applicable?",
   "Is the load strategy incremental rather than full refresh?",
   "Are bulk load utilities used for large data loads?",
   "Are indexes managed appropriately before and after data loads?",
   "Are ETL jobs scheduled during off-peak hours to reduce system load?",
   "Is job execution time monitored and logged for performance analysis?",
   "Are performance metrics captured and reviewed regularly?",
   "Are error handling and retry mechanisms in place to avoid job failures?",
   "Is the ETL process scalable for future data growth?",
   "Are temporary staging tables cleaned up after job completion?",
   "Is data caching used effectively to reduce redundant processing?",
   "Are surrogate key generation and lookups optimized?",
   "Are unnecessary columns excluded from data extraction?",
   "Is network bandwidth considered in data transfer strategies?",
   "Are ETL tools configured with optimal memory and thread settings?",
   "Is there a rollback strategy in case of partial load failures?"
];

export default etlQuestions;