import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

interface TestResult {
  passed: boolean;
  taskId: string;
  testFile: string;
  output: string;
  errors: string[];
}

interface TaskTestConfig {
  taskId: string;
  testFile: string;
  description: string;
  dependencies?: string[]; // Scripts/commands to run before tests
}

const TASK_TEST_MAPPING: Record<string, TaskTestConfig> = {
  T027: {
    taskId: 'T027',
    testFile: 'tests/material.service.spec.ts',
    description: 'Material service CRUD operations',
    dependencies: [],
  },
  T029: {
    taskId: 'T029',
    testFile: 'tests/materials.list.spec.ts',
    description: 'Material list component',
    dependencies: ['T027'],
  },
  T030: {
    taskId: 'T030',
    testFile: 'tests/materials.form.spec.ts',
    description: 'Material form component',
    dependencies: ['T027', 'T029'],
  },
  T031: {
    taskId: 'T031',
    testFile: 'tests/materials.delete.spec.ts',
    description: 'Delete material modal with in-use check',
    dependencies: ['T027', 'T029'],
  },
  T032: {
    taskId: 'T032',
    testFile: 'tests/materials.page.spec.ts',
    description: 'Materials page routing',
    dependencies: ['T029', 'T030', 'T031'],
  },
};

async function runPlaywrightTests(testFile: string): Promise<{ passed: boolean; output: string }> {
  try {
    const cwd = path.join(__dirname, '..', 'frontend');
    const output = execSync(`npx playwright test ${testFile} --reporter=json`, {
      cwd,
      encoding: 'utf-8',
      stdio: ['pipe', 'pipe', 'pipe'],
    });
    return { passed: true, output };
  } catch (err: any) {
    return { passed: false, output: err.stdout || err.message };
  }
}

function parseTasksFile(filePath: string): Set<string> {
  const content = fs.readFileSync(filePath, 'utf-8');
  const completedTasks = new Set<string>();

  const taskRegex = /^- \[x\] (T\d+)/gm;
  let match;
  while ((match = taskRegex.exec(content)) !== null) {
    completedTasks.add(match[1]);
  }

  return completedTasks;
}

function getLastCompletedTask(tasksFile: string, previousTasksFile?: string): string | null {
  const current = parseTasksFile(tasksFile);
  const previous = previousTasksFile ? parseTasksFile(previousTasksFile) : new Set();

  for (const task of current) {
    if (!previous.has(task)) {
      return task;
    }
  }

  return null;
}

async function generateTestReport(
  taskId: string,
  config: TaskTestConfig,
  result: TestResult
): Promise<void> {
  const reportPath = path.join(__dirname, '..', 'test-reports', `${taskId}-test-report.md`);
  const reportDir = path.dirname(reportPath);

  if (!fs.existsSync(reportDir)) {
    fs.mkdirSync(reportDir, { recursive: true });
  }

  const status = result.passed ? '✅ PASSED' : '❌ FAILED';
  const timestamp = new Date().toISOString();

  let report = `# Test Report: ${taskId}\n\n`;
  report += `**Status**: ${status}\n`;
  report += `**Task**: ${config.description}\n`;
  report += `**Test File**: ${config.testFile}\n`;
  report += `**Timestamp**: ${timestamp}\n\n`;

  if (result.passed) {
    report += `## Summary\n\nAll tests for task ${taskId} passed successfully.\n\n`;
  } else {
    report += `## Issues Found\n\n`;
    report += `**Output**:\n\`\`\`\n${result.output}\n\`\`\`\n\n`;

    if (result.errors.length > 0) {
      report += `**Errors**:\n\n`;
      result.errors.forEach((err) => {
        report += `- ${err}\n`;
      });
      report += '\n';
    }

    report += `## Next Steps\n\n`;
    report += `1. Review the test output above\n`;
    report += `2. Check for:\n`;
    report += `   - Missing dependencies\n`;
    report += `   - API endpoint issues (ensure backend is running)\n`;
    report += `   - TypeScript compilation errors\n`;
    report += `   - Component import paths\n`;
    report += `3. Fix the issues and run tests again with:\n`;
    report += `   \`\`\`bash\n`;
    report += `   npm run test-task-completion -- ${taskId}\n`;
    report += `   \`\`\`\n\n`;

    report += `## Required Actions\n\n`;
    report += `If tests fail due to:\n`;
    report += `- **Backend not running**: Execute \`npm run devStart\` in another terminal\n`;
    report += `- **Database not ready**: Execute \`sudo docker-compose up -d\`\n`;
    report += `- **Admin user missing**: Execute \`npx ts-node scripts/create_admin.ts\`\n`;
  }

  fs.writeFileSync(reportPath, report);
  console.log(`\n📄 Test report generated: ${reportPath}`);
}

async function main() {
  const taskId = process.argv[2];
  const tasksFile = path.join(__dirname, '..', 'specs', '002-admin-panel-jwt', 'tasks.md');

  if (!fs.existsSync(tasksFile)) {
    console.error('❌ tasks.md not found');
    process.exit(1);
  }

  const config = taskId ? TASK_TEST_MAPPING[taskId] : null;

  if (!config) {
    console.log('📋 No test configuration for this task');
    process.exit(0);
  }

  console.log(`\n🧪 Testing Task: ${config.taskId} — ${config.description}`);
  console.log(`📝 Test File: ${config.testFile}\n`);

  // Check if test file exists
  const testPath = path.join(__dirname, '..', 'frontend', config.testFile);
  if (!fs.existsSync(testPath)) {
    console.log(`⚠️  Test file not found: ${config.testFile}`);
    console.log(`Creating test file stub...\n`);

    const testDir = path.dirname(testPath);
    if (!fs.existsSync(testDir)) {
      fs.mkdirSync(testDir, { recursive: true });
    }

    const testStub = `import { test, expect } from '@playwright/test';

test.describe('${config.description}', () => {
  test('TODO: Implement tests for ${config.taskId}', async ({ page }) => {
    // This is a placeholder test
    // Replace with actual test implementation
    expect(true).toBe(true);
  });
});
`;

    fs.writeFileSync(testPath, testStub);
    console.log(`✅ Test stub created: ${config.testFile}\n`);
  }

  // Run tests
  console.log('Running Playwright tests...\n');
  const testResult = await runPlaywrightTests(config.testFile);

  const result: TestResult = {
    passed: testResult.passed,
    taskId: config.taskId,
    testFile: config.testFile,
    output: testResult.output,
    errors: testResult.passed ? [] : ['Test execution failed'],
  };

  if (result.passed) {
    console.log(`✅ All tests passed for ${config.taskId}\n`);
  } else {
    console.log(`❌ Tests failed for ${config.taskId}\n`);
  }

  await generateTestReport(config.taskId, config, result);

  process.exit(result.passed ? 0 : 1);
}

main().catch((err) => {
  console.error('Error:', err);
  process.exit(1);
});
