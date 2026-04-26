import fs from 'fs';
import path from 'path';
import { glob } from 'glob';

interface ReviewIssue {
  file: string;
  line: number;
  type: 'accessibility' | 'composition' | 'info';
  message: string;
  fix: string;
}

interface ReviewResult {
  score: number;
  passed: number;
  failed: number;
  issues: ReviewIssue[];
}

async function reviewComponent(filePath: string): Promise<ReviewIssue[]> {
  const content = fs.readFileSync(filePath, 'utf-8');
  const lines = content.split('\n');
  const issues: ReviewIssue[] = [];
  let issueCount = 0;

  // Accessibility checks
  const a11yIssues = checkAccessibility(content, lines);
  issues.push(...a11yIssues);
  issueCount += a11yIssues.length;

  // Composition checks
  const compositionIssues = checkComposition(content, lines, filePath);
  issues.push(...compositionIssues);
  issueCount += compositionIssues.length;

  return issues;
}

function checkAccessibility(content: string, lines: string[]): ReviewIssue[] {
  const issues: ReviewIssue[] = [];

  // Check for button without accessible text
  lines.forEach((line, idx) => {
    const lineNum = idx + 1;

    // <button> without aria-label or text content
    if (/<button[^>]*>/.test(line) && !/>([^<]+)<\/button>/.test(line)) {
      if (!line.includes('aria-label') && !line.includes('title')) {
        issues.push({
          file: '',
          line: lineNum,
          type: 'accessibility',
          message: '<button> missing accessible text or aria-label',
          fix: 'Add aria-label="action" or visible text content',
        });
      }
    }

    // <img> without alt
    if (/<img[^>]*>/.test(line) && !line.includes('alt=')) {
      issues.push({
        file: '',
        line: lineNum,
        type: 'accessibility',
        message: '<img> missing alt attribute',
        fix: 'Add alt="description" to describe image purpose',
      });
    }

    // <input> without label
    if (/<input[^>]*>/.test(line)) {
      const hasLabel = /aria-label|placeholder/.test(line);
      const hasSibling = lines.some(
        (l, i) =>
          i < idx &&
          i > idx - 3 &&
          (/<label[^>]*htmlFor/.test(l) || /<label[^>]*>/.test(l))
      );
      if (!hasLabel && !hasSibling) {
        issues.push({
          file: '',
          line: lineNum,
          type: 'accessibility',
          message: '<input> missing associated label or aria-label',
          fix: 'Add <label htmlFor="id"> or aria-label attribute',
        });
      }
    }

    // Non-semantic heading (div styled as h1)
    if (/className="[^"]*text-(3xl|4xl)[^"]*"/.test(line) && line.includes('<div')) {
      issues.push({
        file: '',
        line: lineNum,
        type: 'accessibility',
        message: 'Large div styled as heading—use <h1>, <h2>, etc.',
        fix: 'Replace <div> with semantic heading tag',
      });
    }

    // TODO: Detect onClick on non-semantic elements (div, span, etc.)
    // Current detection has false positives with multi-line JSX formatting
    // Manual review needed for this pattern
  });

  return issues;
}

function checkComposition(
  content: string,
  lines: string[],
  filePath: string
): ReviewIssue[] {
  const issues: ReviewIssue[] = [];

  // File naming check would require parsing the export, skip for now
  // Assumes developers follow convention of PascalCase file = PascalCase export

  // Check if component does too much (heuristic: useState count)
  const useStateCount = (content.match(/useState\(/g) || []).length;
  const useEffectCount = (content.match(/useEffect\(/g) || []).length;
  const renderLines = content.split('\n').filter((l) => /return|<[A-Z]|<[a-z]/.test(l)).length;

  if (useStateCount > 5) {
    issues.push({
      file: '',
      line: 1,
      type: 'composition',
      message: `Component has ${useStateCount} useState calls—consider breaking into smaller components`,
      fix: 'Extract state-heavy logic into custom hooks or child components',
    });
  }

  if (renderLines > 100) {
    issues.push({
      file: '',
      line: 1,
      type: 'composition',
      message: `Component render is ${renderLines} lines—too large, violates single responsibility`,
      fix: 'Break JSX into smaller, focused sub-components',
    });
  }

  // Inline object detection skipped—too many false positives with styled libs & framer-motion
  // Real composition smell: component size and state complexity (detected above)

  return issues;
}

async function main() {
  const pattern = process.argv[2] || 'src/**/*.{tsx,jsx}';
  const files = await glob(pattern, {
    ignore: ['node_modules/**', '**/*.spec.*', '**/*.test.*'],
  });

  if (files.length === 0) {
    console.log(`No component files found matching: ${pattern}`);
    process.exit(0);
  }

  let totalIssues = 0;
  let filesWithIssues = 0;

  console.log(`\n📋 Design Review: React Components\n`);
  console.log(`Scanning ${files.length} files...\n`);

  for (const file of files) {
    const issues = await reviewComponent(file);
    if (issues.length > 0) {
      filesWithIssues++;
      totalIssues += issues.length;

      console.log(`❌ ${file}`);
      issues.forEach((issue) => {
        const icon = issue.type === 'accessibility' ? '♿' : '🔧';
        console.log(`   ${icon} [${issue.line}] ${issue.message}`);
        console.log(`      → ${issue.fix}`);
      });
      console.log();
    }
  }

  // Score calculation
  const score = Math.max(0, 100 - totalIssues * 5);
  const percentage = Math.round((score / 100) * 100);

  console.log(`\n📊 Summary`);
  console.log(`──────────────`);
  console.log(`Files reviewed:    ${files.length}`);
  console.log(`Files with issues: ${filesWithIssues}`);
  console.log(`Total issues:      ${totalIssues}`);
  console.log(`Score:             ${score}/100 (${percentage}%)`);
  console.log();

  if (score < 80) {
    console.log('⚠️  Design review failed. Fix accessibility and composition issues above.\n');
    process.exit(1);
  } else if (score < 95) {
    console.log('✅ Acceptable. Consider addressing issues for better score.\n');
    process.exit(0);
  } else {
    console.log('🎉 Excellent design! All components follow best practices.\n');
    process.exit(0);
  }
}

main().catch((err) => {
  console.error('Design review error:', err);
  process.exit(1);
});
