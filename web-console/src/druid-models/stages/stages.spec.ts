/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { Stages } from './stages';

describe('Stages', () => {
  describe('#overallProgress', () => {
    it('works when finished', () => {
      expect(
        new Stages(
          [
            {
              stageNumber: 0,
              definition: {
                id: 'ac4d6506-6e1d-4fd7-96e2-193f46219d4b_0',
                input: [
                  {
                    type: 'external',
                    inputSource: {
                      type: 'http',
                      uris: ['https://static.imply.io/example-data/lookup/countries.tsv'],
                      httpAuthenticationUsername: null,
                      httpAuthenticationPassword: null,
                    },
                    inputFormat: {
                      type: 'tsv',
                      columns: [],
                      listDelimiter: null,
                      delimiter: '\t',
                      findColumnsFromHeader: true,
                      skipHeaderRows: 0,
                    },
                    signature: [
                      { name: 'Country', type: 'STRING' },
                      { name: 'Capital', type: 'STRING' },
                      { name: 'ISO3', type: 'STRING' },
                      { name: 'ISO2', type: 'STRING' },
                    ],
                  },
                ],
                processor: {
                  type: 'scan',
                  query: {
                    queryType: 'scan',
                    dataSource: { type: 'inputNumber', inputNumber: 0 },
                    intervals: {
                      type: 'intervals',
                      intervals: ['-146136543-09-08T08:23:32.096Z/146140482-04-24T15:36:27.903Z'],
                    },
                    resultFormat: 'compactedList',
                    columns: ['Capital', 'Country', 'ISO3'],
                    legacy: false,
                    context: {
                      groupByEnableMultiValueUnnesting: false,
                      finalizeAggregations: false,
                      maxNumTasks: 3,
                      scanSignature:
                        '[{"name":"Capital","type":"STRING"},{"name":"Country","type":"STRING"},{"name":"ISO3","type":"STRING"}]',
                      multiStageQuery: true,
                      sqlInsertSegmentGranularity: '"HOUR"',
                      sqlQueryId: '57c2dca3-0199-4c61-bef0-344a68ff351b',
                      sqlReplaceTimeChunks: 'all',
                    },
                    granularity: { type: 'all' },
                  },
                },
                signature: [
                  { name: '__bucket', type: 'LONG' },
                  { name: '__boost', type: 'LONG' },
                  { name: 'Capital', type: 'STRING' },
                  { name: 'Country', type: 'STRING' },
                  { name: 'ISO3', type: 'STRING' },
                ],
                shuffleSpec: {
                  type: 'maxCount',
                  clusterBy: {
                    columns: [{ columnName: '__bucket' }, { columnName: '__boost' }],
                    bucketByCount: 1,
                  },
                  partitions: 2,
                  aggregate: false,
                },
                maxWorkerCount: 2,
              },
              phase: 'FINISHED',
              workerCount: 2,
              partitionCount: 2,
              startTime: '2022-07-06T16:27:32.835Z',
              duration: 313,
              sort: true,
            },
            {
              stageNumber: 1,
              definition: {
                id: 'ac4d6506-6e1d-4fd7-96e2-193f46219d4b_1',
                input: [
                  { type: 'table', dataSource: 'kttm_simple' },
                  { type: 'stage', stage: 0 },
                ],
                broadcast: [1],
                processor: {
                  type: 'groupByPreShuffle',
                  query: {
                    queryType: 'groupBy',
                    dataSource: {
                      type: 'join',
                      left: { type: 'inputNumber', inputNumber: 0 },
                      right: { type: 'inputNumber', inputNumber: 1 },
                      rightPrefix: 'j0.',
                      condition: '("country" == "j0.Country")',
                      joinType: 'LEFT',
                    },
                    intervals: {
                      type: 'intervals',
                      intervals: ['-146136543-09-08T08:23:32.096Z/146140482-04-24T15:36:27.903Z'],
                    },
                    virtualColumns: [
                      {
                        type: 'expression',
                        name: 'v0',
                        expression:
                          "timestamp_floor(timestamp_parse(\"timestamp\",null,'UTC'),'PT1M',null,'UTC')",
                        outputType: 'LONG',
                      },
                      {
                        type: 'expression',
                        name: 'v1',
                        expression: 'mv_to_array("language")',
                        outputType: 'ARRAY<STRING>',
                      },
                      { type: 'expression', name: 'v2', expression: "'iOS'", outputType: 'STRING' },
                    ],
                    filter: { type: 'selector', dimension: 'os', value: 'iOS' },
                    granularity: { type: 'all' },
                    dimensions: [
                      { type: 'default', dimension: 'v0', outputName: 'd0', outputType: 'LONG' },
                      {
                        type: 'default',
                        dimension: 'session',
                        outputName: 'd1',
                        outputType: 'STRING',
                      },
                      {
                        type: 'default',
                        dimension: 'agent_category',
                        outputName: 'd2',
                        outputType: 'STRING',
                      },
                      {
                        type: 'default',
                        dimension: 'agent_type',
                        outputName: 'd3',
                        outputType: 'STRING',
                      },
                      {
                        type: 'default',
                        dimension: 'browser',
                        outputName: 'd4',
                        outputType: 'STRING',
                      },
                      {
                        type: 'default',
                        dimension: 'browser_version',
                        outputName: 'd5',
                        outputType: 'STRING',
                      },
                      {
                        type: 'extraction',
                        dimension: 'browser_version',
                        outputName: 'd6',
                        outputType: 'LONG',
                        extractionFn: {
                          type: 'regex',
                          expr: '^(\\d+)',
                          index: 0,
                          replaceMissingValue: true,
                          replaceMissingValueWith: null,
                        },
                      },
                      {
                        type: 'default',
                        dimension: 'v1',
                        outputName: 'd7',
                        outputType: 'ARRAY<STRING>',
                      },
                      { type: 'default', dimension: 'v2', outputName: 'd8', outputType: 'STRING' },
                      {
                        type: 'default',
                        dimension: 'city',
                        outputName: 'd9',
                        outputType: 'STRING',
                      },
                      {
                        type: 'default',
                        dimension: 'country',
                        outputName: 'd10',
                        outputType: 'STRING',
                      },
                      {
                        type: 'default',
                        dimension: 'j0.Capital',
                        outputName: 'd11',
                        outputType: 'STRING',
                      },
                      {
                        type: 'default',
                        dimension: 'j0.ISO3',
                        outputName: 'd12',
                        outputType: 'STRING',
                      },
                      {
                        type: 'default',
                        dimension: 'forwarded_for',
                        outputName: 'd13',
                        outputType: 'STRING',
                      },
                    ],
                    aggregations: [
                      { type: 'count', name: 'a0' },
                      { type: 'longSum', name: 'a1', fieldName: 'session_length' },
                      {
                        type: 'HLLSketchBuild',
                        name: 'a2',
                        fieldName: 'event_type',
                        lgK: 12,
                        tgtHllType: 'HLL_4',
                        round: true,
                      },
                    ],
                    limitSpec: {
                      type: 'default',
                      columns: [
                        {
                          dimension: 'd4',
                          direction: 'ascending',
                          dimensionOrder: { type: 'lexicographic' },
                        },
                        {
                          dimension: 'd1',
                          direction: 'ascending',
                          dimensionOrder: { type: 'lexicographic' },
                        },
                      ],
                    },
                    context: {
                      finalize: false,
                      groupByEnableMultiValueUnnesting: false,
                      finalizeAggregations: false,
                      maxNumTasks: 3,
                      scanSignature:
                        '[{"name":"Capital","type":"STRING"},{"name":"Country","type":"STRING"},{"name":"ISO3","type":"STRING"}]',
                      msqTimeColumn: 'd0',
                      multiStageQuery: true,
                      sqlInsertSegmentGranularity: '"HOUR"',
                      sqlQueryId: '57c2dca3-0199-4c61-bef0-344a68ff351b',
                      sqlReplaceTimeChunks: 'all',
                    },
                  },
                },
                signature: [
                  { name: 'd0', type: 'LONG' },
                  { name: 'd1', type: 'STRING' },
                  { name: 'd2', type: 'STRING' },
                  { name: 'd3', type: 'STRING' },
                  { name: 'd4', type: 'STRING' },
                  { name: 'd5', type: 'STRING' },
                  { name: 'd6', type: 'LONG' },
                  { name: 'd7', type: 'ARRAY<STRING>' },
                  { name: 'd8', type: 'STRING' },
                  { name: 'd9', type: 'STRING' },
                  { name: 'd10', type: 'STRING' },
                  { name: 'd11', type: 'STRING' },
                  { name: 'd12', type: 'STRING' },
                  { name: 'd13', type: 'STRING' },
                  { name: 'a0', type: 'LONG' },
                  { name: 'a1', type: 'LONG' },
                  { name: 'a2', type: 'COMPLEX<HLLSketchBuild>' },
                ],
                shuffleSpec: {
                  type: 'maxCount',
                  clusterBy: {
                    columns: [
                      { columnName: 'd0' },
                      { columnName: 'd1' },
                      { columnName: 'd2' },
                      { columnName: 'd3' },
                      { columnName: 'd4' },
                      { columnName: 'd5' },
                      { columnName: 'd6' },
                      { columnName: 'd7' },
                      { columnName: 'd8' },
                      { columnName: 'd9' },
                      { columnName: 'd10' },
                      { columnName: 'd11' },
                      { columnName: 'd12' },
                      { columnName: 'd13' },
                    ],
                  },
                  partitions: 2,
                  aggregate: true,
                },
                maxWorkerCount: 2,
              },
              phase: 'FINISHED',
              workerCount: 2,
              partitionCount: 2,
              startTime: '2022-07-06T16:27:33.139Z',
              duration: 1927,
              sort: true,
            },
            {
              stageNumber: 2,
              definition: {
                id: 'ac4d6506-6e1d-4fd7-96e2-193f46219d4b_2',
                input: [{ type: 'stage', stage: 1 }],
                processor: {
                  type: 'groupByPostShuffle',
                  query: {
                    queryType: 'groupBy',
                    dataSource: {
                      type: 'join',
                      left: { type: 'inputNumber', inputNumber: 0 },
                      right: { type: 'inputNumber', inputNumber: 1 },
                      rightPrefix: 'j0.',
                      condition: '("country" == "j0.Country")',
                      joinType: 'LEFT',
                    },
                    intervals: {
                      type: 'intervals',
                      intervals: ['-146136543-09-08T08:23:32.096Z/146140482-04-24T15:36:27.903Z'],
                    },
                    virtualColumns: [
                      {
                        type: 'expression',
                        name: 'v0',
                        expression:
                          "timestamp_floor(timestamp_parse(\"timestamp\",null,'UTC'),'PT1M',null,'UTC')",
                        outputType: 'LONG',
                      },
                      {
                        type: 'expression',
                        name: 'v1',
                        expression: 'mv_to_array("language")',
                        outputType: 'ARRAY<STRING>',
                      },
                      { type: 'expression', name: 'v2', expression: "'iOS'", outputType: 'STRING' },
                    ],
                    filter: { type: 'selector', dimension: 'os', value: 'iOS' },
                    granularity: { type: 'all' },
                    dimensions: [
                      { type: 'default', dimension: 'v0', outputName: 'd0', outputType: 'LONG' },
                      {
                        type: 'default',
                        dimension: 'session',
                        outputName: 'd1',
                        outputType: 'STRING',
                      },
                      {
                        type: 'default',
                        dimension: 'agent_category',
                        outputName: 'd2',
                        outputType: 'STRING',
                      },
                      {
                        type: 'default',
                        dimension: 'agent_type',
                        outputName: 'd3',
                        outputType: 'STRING',
                      },
                      {
                        type: 'default',
                        dimension: 'browser',
                        outputName: 'd4',
                        outputType: 'STRING',
                      },
                      {
                        type: 'default',
                        dimension: 'browser_version',
                        outputName: 'd5',
                        outputType: 'STRING',
                      },
                      {
                        type: 'extraction',
                        dimension: 'browser_version',
                        outputName: 'd6',
                        outputType: 'LONG',
                        extractionFn: {
                          type: 'regex',
                          expr: '^(\\d+)',
                          index: 0,
                          replaceMissingValue: true,
                          replaceMissingValueWith: null,
                        },
                      },
                      {
                        type: 'default',
                        dimension: 'v1',
                        outputName: 'd7',
                        outputType: 'ARRAY<STRING>',
                      },
                      { type: 'default', dimension: 'v2', outputName: 'd8', outputType: 'STRING' },
                      {
                        type: 'default',
                        dimension: 'city',
                        outputName: 'd9',
                        outputType: 'STRING',
                      },
                      {
                        type: 'default',
                        dimension: 'country',
                        outputName: 'd10',
                        outputType: 'STRING',
                      },
                      {
                        type: 'default',
                        dimension: 'j0.Capital',
                        outputName: 'd11',
                        outputType: 'STRING',
                      },
                      {
                        type: 'default',
                        dimension: 'j0.ISO3',
                        outputName: 'd12',
                        outputType: 'STRING',
                      },
                      {
                        type: 'default',
                        dimension: 'forwarded_for',
                        outputName: 'd13',
                        outputType: 'STRING',
                      },
                    ],
                    aggregations: [
                      { type: 'count', name: 'a0' },
                      { type: 'longSum', name: 'a1', fieldName: 'session_length' },
                      {
                        type: 'HLLSketchBuild',
                        name: 'a2',
                        fieldName: 'event_type',
                        lgK: 12,
                        tgtHllType: 'HLL_4',
                        round: true,
                      },
                    ],
                    limitSpec: {
                      type: 'default',
                      columns: [
                        {
                          dimension: 'd4',
                          direction: 'ascending',
                          dimensionOrder: { type: 'lexicographic' },
                        },
                        {
                          dimension: 'd1',
                          direction: 'ascending',
                          dimensionOrder: { type: 'lexicographic' },
                        },
                      ],
                    },
                    context: {
                      finalize: false,
                      groupByEnableMultiValueUnnesting: false,
                      finalizeAggregations: false,
                      maxNumTasks: 3,
                      scanSignature:
                        '[{"name":"Capital","type":"STRING"},{"name":"Country","type":"STRING"},{"name":"ISO3","type":"STRING"}]',
                      msqTimeColumn: 'd0',
                      multiStageQuery: true,
                      sqlInsertSegmentGranularity: '"HOUR"',
                      sqlQueryId: '57c2dca3-0199-4c61-bef0-344a68ff351b',
                      sqlReplaceTimeChunks: 'all',
                    },
                  },
                },
                signature: [
                  { name: '__bucket', type: 'LONG' },
                  { name: 'd4', type: 'STRING' },
                  { name: 'd1', type: 'STRING' },
                  { name: 'd0', type: 'LONG' },
                  { name: 'd2', type: 'STRING' },
                  { name: 'd3', type: 'STRING' },
                  { name: 'd5', type: 'STRING' },
                  { name: 'd6', type: 'LONG' },
                  { name: 'd7', type: 'ARRAY<STRING>' },
                  { name: 'd8', type: 'STRING' },
                  { name: 'd9', type: 'STRING' },
                  { name: 'd10', type: 'STRING' },
                  { name: 'd11', type: 'STRING' },
                  { name: 'd12', type: 'STRING' },
                  { name: 'd13', type: 'STRING' },
                  { name: 'a0', type: 'LONG' },
                  { name: 'a1', type: 'LONG' },
                  { name: 'a2', type: 'COMPLEX<HLLSketchBuild>' },
                ],
                shuffleSpec: {
                  type: 'targetSize',
                  clusterBy: {
                    columns: [
                      { columnName: '__bucket' },
                      { columnName: 'd4' },
                      { columnName: 'd1' },
                    ],
                    bucketByCount: 1,
                  },
                  targetSize: 3000000,
                  aggregate: false,
                },
                maxWorkerCount: 2,
                shuffleCheckHasMultipleValues: true,
              },
              phase: 'FINISHED',
              workerCount: 2,
              partitionCount: 24,
              startTime: '2022-07-06T16:27:35.052Z',
              duration: 509,
              sort: true,
            },
            {
              stageNumber: 3,
              definition: {
                id: 'ac4d6506-6e1d-4fd7-96e2-193f46219d4b_3',
                input: [{ type: 'stage', stage: 2 }],
                processor: {
                  type: 'segmentGenerator',
                  dataSchema: {
                    dataSource: 'kttm_reingest',
                    timestampSpec: { column: '__time', format: 'millis', missingValue: null },
                    dimensionsSpec: {
                      dimensions: [
                        {
                          type: 'string',
                          name: 'browser',
                          multiValueHandling: 'SORTED_ARRAY',
                          createBitmapIndex: true,
                        },
                        {
                          type: 'string',
                          name: 'session',
                          multiValueHandling: 'SORTED_ARRAY',
                          createBitmapIndex: true,
                        },
                        {
                          type: 'string',
                          name: 'agent_category',
                          multiValueHandling: 'SORTED_ARRAY',
                          createBitmapIndex: true,
                        },
                        {
                          type: 'string',
                          name: 'agent_type',
                          multiValueHandling: 'SORTED_ARRAY',
                          createBitmapIndex: true,
                        },
                        {
                          type: 'string',
                          name: 'browser_version',
                          multiValueHandling: 'SORTED_ARRAY',
                          createBitmapIndex: true,
                        },
                        {
                          type: 'long',
                          name: 'browser_major',
                          multiValueHandling: 'SORTED_ARRAY',
                          createBitmapIndex: false,
                        },
                        {
                          type: 'string',
                          name: 'language',
                          multiValueHandling: 'ARRAY',
                          createBitmapIndex: true,
                        },
                        {
                          type: 'string',
                          name: 'os',
                          multiValueHandling: 'SORTED_ARRAY',
                          createBitmapIndex: true,
                        },
                        {
                          type: 'string',
                          name: 'city',
                          multiValueHandling: 'SORTED_ARRAY',
                          createBitmapIndex: true,
                        },
                        {
                          type: 'string',
                          name: 'country',
                          multiValueHandling: 'SORTED_ARRAY',
                          createBitmapIndex: true,
                        },
                        {
                          type: 'string',
                          name: 'capital',
                          multiValueHandling: 'SORTED_ARRAY',
                          createBitmapIndex: true,
                        },
                        {
                          type: 'string',
                          name: 'iso3',
                          multiValueHandling: 'SORTED_ARRAY',
                          createBitmapIndex: true,
                        },
                        {
                          type: 'string',
                          name: 'ip_address',
                          multiValueHandling: 'SORTED_ARRAY',
                          createBitmapIndex: true,
                        },
                      ],
                      dimensionExclusions: [
                        '__time',
                        'unique_event_types',
                        'cnt',
                        'session_length',
                      ],
                      includeAllDimensions: false,
                    },
                    metricsSpec: [
                      { type: 'longSum', name: 'cnt', fieldName: 'cnt' },
                      { type: 'longSum', name: 'session_length', fieldName: 'session_length' },
                      {
                        type: 'HLLSketchMerge',
                        name: 'unique_event_types',
                        fieldName: 'unique_event_types',
                        lgK: 12,
                        tgtHllType: 'HLL_4',
                        round: true,
                      },
                    ],
                    granularitySpec: {
                      type: 'arbitrary',
                      queryGranularity: { type: 'none' },
                      rollup: true,
                      intervals: ['-146136543-09-08T08:23:32.096Z/146140482-04-24T15:36:27.903Z'],
                    },
                    transformSpec: { filter: null, transforms: [] },
                  },
                  columnMappings: [
                    { queryColumn: 'd0', outputColumn: '__time' },
                    { queryColumn: 'd1', outputColumn: 'session' },
                    { queryColumn: 'd2', outputColumn: 'agent_category' },
                    { queryColumn: 'd3', outputColumn: 'agent_type' },
                    { queryColumn: 'd4', outputColumn: 'browser' },
                    { queryColumn: 'd5', outputColumn: 'browser_version' },
                    { queryColumn: 'd6', outputColumn: 'browser_major' },
                    { queryColumn: 'd7', outputColumn: 'language' },
                    { queryColumn: 'd8', outputColumn: 'os' },
                    { queryColumn: 'd9', outputColumn: 'city' },
                    { queryColumn: 'd10', outputColumn: 'country' },
                    { queryColumn: 'd11', outputColumn: 'capital' },
                    { queryColumn: 'd12', outputColumn: 'iso3' },
                    { queryColumn: 'd13', outputColumn: 'ip_address' },
                    { queryColumn: 'a0', outputColumn: 'cnt' },
                    { queryColumn: 'a1', outputColumn: 'session_length' },
                    { queryColumn: 'a2', outputColumn: 'unique_event_types' },
                  ],
                  tuningConfig: {
                    type: 'index_parallel',
                    maxRowsPerSegment: 3000000,
                    appendableIndexSpec: { type: 'onheap', preserveExistingMetrics: false },
                    maxRowsInMemory: 100000,
                    maxBytesInMemory: 0,
                    skipBytesInMemoryOverheadCheck: false,
                    maxTotalRows: null,
                    numShards: null,
                    splitHintSpec: null,
                    partitionsSpec: {
                      type: 'dynamic',
                      maxRowsPerSegment: 3000000,
                      maxTotalRows: null,
                    },
                    indexSpec: {
                      bitmap: { type: 'roaring', compressRunOnSerialization: true },
                      dimensionCompression: 'lz4',
                      metricCompression: 'lz4',
                      longEncoding: 'longs',
                      segmentLoader: null,
                    },
                    indexSpecForIntermediatePersists: {
                      bitmap: { type: 'roaring', compressRunOnSerialization: true },
                      dimensionCompression: 'lz4',
                      metricCompression: 'lz4',
                      longEncoding: 'longs',
                      segmentLoader: null,
                    },
                    maxPendingPersists: 0,
                    forceGuaranteedRollup: false,
                    reportParseExceptions: false,
                    pushTimeout: 0,
                    segmentWriteOutMediumFactory: null,
                    maxNumConcurrentSubTasks: 2,
                    maxRetry: 1,
                    taskStatusCheckPeriodMs: 1000,
                    chatHandlerTimeout: 'PT10S',
                    chatHandlerNumRetries: 5,
                    maxNumSegmentsToMerge: 100,
                    totalNumMergeTasks: 10,
                    logParseExceptions: false,
                    maxParseExceptions: 2147483647,
                    maxSavedParseExceptions: 0,
                    maxColumnsToMerge: -1,
                    awaitSegmentAvailabilityTimeoutMillis: 0,
                    maxAllowedLockCount: -1,
                    partitionDimensions: [],
                  },
                },
                signature: [],
                maxWorkerCount: 2,
              },
              phase: 'FINISHED',
              workerCount: 2,
              partitionCount: 24,
              startTime: '2022-07-06T16:27:35.552Z',
              duration: 2812,
            },
          ],
          {
            '0': {
              '0': {
                input0: { type: 'channel', rows: [197], files: [1], totalFiles: [1] },
                output: { type: 'channel', rows: [197], bytes: [15468], frames: [1] },
                shuffle: { type: 'channel', rows: [98, 99], bytes: [7260, 7454], frames: [1, 1] },
                sortProgress: {
                  type: 'sortProgress',
                  totalMergingLevels: 3,
                  levelToTotalBatches: { '0': 1, '1': 1, '2': 2 },
                  levelToMergedBatches: { '0': 1, '1': 1, '2': 2 },
                  totalMergersForUltimateLevel: 2,
                  progressDigest: 1.0,
                },
              },
              '1': {
                sortProgress: {
                  type: 'sortProgress',
                  totalMergingLevels: -1,
                  levelToTotalBatches: {},
                  levelToMergedBatches: {},
                  totalMergersForUltimateLevel: -1,
                  triviallyComplete: true,
                  progressDigest: 1.0,
                },
              },
            },
            '1': {
              '0': {
                input0: {
                  type: 'channel',
                  rows: [462096],
                  bytes: [43452909],
                  files: [1],
                  totalFiles: [1],
                },
                input1: { type: 'channel', rows: [98, 99], bytes: [7260, 7454], frames: [1, 1] },
                output: { type: 'channel', rows: [39667], bytes: [11081283], frames: [2] },
                shuffle: {
                  type: 'channel',
                  rows: [19834, 19833],
                  bytes: [5458795, 5464500],
                  frames: [11, 11],
                },
                sortProgress: {
                  type: 'sortProgress',
                  totalMergingLevels: 3,
                  levelToTotalBatches: { '0': 1, '1': 1, '2': 2 },
                  levelToMergedBatches: { '0': 1, '1': 1, '2': 2 },
                  totalMergersForUltimateLevel: 2,
                  progressDigest: 1.0,
                },
              },
              '1': {
                sortProgress: {
                  type: 'sortProgress',
                  totalMergingLevels: -1,
                  levelToTotalBatches: {},
                  levelToMergedBatches: {},
                  totalMergersForUltimateLevel: -1,
                  triviallyComplete: true,
                  progressDigest: 1.0,
                },
              },
            },
            '2': {
              '0': {
                input0: { type: 'channel', rows: [19834], bytes: [5458795], frames: [11] },
                output: { type: 'channel', rows: [19834], bytes: [5795633], frames: [1] },
                shuffle: {
                  type: 'channel',
                  rows: [
                    888, 993, 1418, 894, 590, 633, 309, 241, 236, 309, 253, 260, 440, 876, 1394,
                    892, 3595, 5613,
                  ],
                  bytes: [
                    257524, 289161, 412116, 259346, 170554, 182872, 88525, 67821, 65844, 85875,
                    71002, 72512, 123204, 249217, 399583, 256916, 1039927, 1625012,
                  ],
                  frames: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 4],
                },
                sortProgress: {
                  type: 'sortProgress',
                  totalMergingLevels: 3,
                  levelToTotalBatches: { '0': 1, '1': 1, '2': 24 },
                  levelToMergedBatches: { '0': 1, '1': 1, '2': 24 },
                  totalMergersForUltimateLevel: 24,
                  progressDigest: 1.0,
                },
              },
              '1': {
                input0: { type: 'channel', rows: [0, 19833], bytes: [0, 5464500], frames: [0, 11] },
                output: { type: 'channel', rows: [0, 19833], bytes: [0, 5801321], frames: [0, 1] },
                shuffle: {
                  type: 'channel',
                  rows: [
                    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 909, 4525, 4324, 4149, 2561,
                    1914, 1451,
                  ],
                  bytes: [
                    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 262915, 1307287, 1247597,
                    1195593, 738804, 552485, 417784,
                  ],
                  frames: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 3, 3, 3, 2, 2, 1],
                },
                sortProgress: {
                  type: 'sortProgress',
                  totalMergingLevels: 3,
                  levelToTotalBatches: { '0': 1, '1': 1, '2': 24 },
                  levelToMergedBatches: { '0': 1, '1': 1, '2': 24 },
                  totalMergersForUltimateLevel: 24,
                  progressDigest: 1.0,
                },
              },
            },
            '3': {
              '0': {
                input0: {
                  type: 'channel',
                  rows: [
                    888, 0, 1418, 0, 590, 0, 309, 0, 236, 0, 253, 0, 440, 0, 1394, 0, 3595, 0, 4525,
                    0, 4149, 0, 1914,
                  ],
                  bytes: [
                    257524, 0, 412116, 0, 170554, 0, 88525, 0, 65844, 0, 71002, 0, 123204, 0,
                    399583, 0, 1039927, 0, 1307287, 0, 1195593, 0, 552485,
                  ],
                  frames: [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 2, 0, 3, 0, 3, 0, 2],
                },
              },
              '1': {
                input0: {
                  type: 'channel',
                  rows: [
                    0, 993, 0, 894, 0, 633, 0, 241, 0, 309, 0, 260, 0, 876, 0, 892, 0, 6522, 0,
                    4324, 0, 2561, 0, 1451,
                  ],
                  bytes: [
                    0, 289161, 0, 259346, 0, 182872, 0, 67821, 0, 85875, 0, 72512, 0, 249217, 0,
                    256916, 0, 1887893, 0, 1247597, 0, 738804, 0, 417784,
                  ],
                  frames: [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 4, 0, 3, 0, 2, 0, 1],
                },
              },
            },
          },
        ).overallProgress(),
      ).toBeCloseTo(0.987);
    });
  });
});
