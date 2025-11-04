import { motion } from 'framer-motion'
import { useState } from 'react'
import Button from '../UI/Button'
import MacTerminalCodeBlock from '../UI/MacTerminalCodeBlock'
import Quiz from '../UI/Quiz'
import { useLanguage } from '../../i18n/LanguageContext'
import { useChapterProgress } from '../../hooks/useChapterProgress'
import { LockClosedIcon, ClipboardIcon, CheckCircledIcon } from '@radix-ui/react-icons'

interface ChapterProps {
  onNext: () => void
  onPrevious: () => void
  isFirst: boolean
  isLast: boolean
}

export default function Chapter3({ onNext, onPrevious }: ChapterProps) {
  const { t, language } = useLanguage()
  useChapterProgress(3) // 追踪第三章进度
  const [showQuiz, setShowQuiz] = useState(false)
  const [quizCompleted, setQuizCompleted] = useState(false)

  // 上传文字的代码示例（带简短注释）
  const uploadTextCode = language === 'zh' ? `// 导入 Irys SDK 和以太坊适配器
import { Uploader } from "@irys/upload";
import { Ethereum } from "@irys/upload-ethereum";
import 'dotenv/config';

const uploadText = async (text) => {
  try {
    console.log("🚀 开始上传到 Irys...");
    
    // 创建上传器实例并连接测试网
    const uploader = await Uploader(Ethereum, { network: "testnet" })
      .withWallet(process.env.PRIVATE_KEY);
    
    // 上传文本数据（使用 UTF-8 编码支持中文）
    const receipt = await uploader.upload(Buffer.from(text, 'utf-8'), {
      tags: [
        { name: "Content-Type", value: "text/plain; charset=utf-8" }
      ]
    });
    
    // 格式化输出
    console.log("\\n✅ 上传成功！\\n");
    console.log("📦 响应数据详情：");
    console.log("─".repeat(60));
    console.log(\`交易 ID      : \${receipt.id}\`);
    console.log(\`时间戳      : \${receipt.timestamp} (\${new Date(receipt.timestamp).toLocaleString('zh-CN')})\`);
    console.log(\`Irys 版本   : \${receipt.version}\`);
    console.log(\`上传者公钥  : \${receipt.public?.substring(0, 20)}...\`);
    console.log(\`当前区块    : \${receipt.block || 'N/A'}\`);
    console.log("─".repeat(60));
    console.log(\`\\n🌐 访问地址: https://gateway.irys.xyz/\${receipt.id}\`);
    console.log(\`\\n💾 完整响应对象:\`);
    console.log(JSON.stringify(receipt, null, 2));
    
    return receipt;
  } catch (error) {
    console.error("❌ 上传失败：", error.message);
    throw error;
  }
};

// 调用函数上传示例文本
await uploadText("你好世界 Hello IRYS!");` : `// Import Irys SDK and Ethereum adapter
import { Uploader } from "@irys/upload";
import { Ethereum } from "@irys/upload-ethereum";
import 'dotenv/config';

const uploadText = async (text) => {
  try {
    console.log("🚀 Starting upload to Irys...");
    
    // Create uploader instance and connect to testnet
    const uploader = await Uploader(Ethereum, { network: "testnet" })
      .withWallet(process.env.PRIVATE_KEY);
    
    // Upload text data (using UTF-8 encoding to support multiple languages)
    const receipt = await uploader.upload(Buffer.from(text, 'utf-8'), {
      tags: [
        { name: "Content-Type", value: "text/plain; charset=utf-8" }
      ]
    });
    
    // Format output
    console.log("\\n✅ Upload successful!\\n");
    console.log("📦 Response details:");
    console.log("─".repeat(60));
    console.log(\`Transaction ID: \${receipt.id}\`);
    console.log(\`Timestamp     : \${receipt.timestamp} (\${new Date(receipt.timestamp).toLocaleString('en-US')})\`);
    console.log(\`Irys version  : \${receipt.version}\`);
    console.log(\`Uploader key  : \${receipt.public?.substring(0, 20)}...\`);
    console.log(\`Current block : \${receipt.block || 'N/A'}\`);
    console.log("─".repeat(60));
    console.log(\`\\n🌐 Access URL: https://gateway.irys.xyz/\${receipt.id}\`);
    console.log(\`\\n💾 Full response object:\`);
    console.log(JSON.stringify(receipt, null, 2));
    
    return receipt;
  } catch (error) {
    console.error("❌ Upload failed:", error.message);
    throw error;
  }
};

// Call function to upload sample text
await uploadText("Hello World from IRYS!");`

  // 测验题目 - 从翻译系统读取
  const quizQuestions = t.quizQuestions.chapter3

  const handleQuizComplete = () => {
    setQuizCompleted(true)
    setShowQuiz(false)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="space-y-8 w-full max-w-full overflow-hidden"
    >
      <div>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold gradient-text mb-3 md:mb-4">
          {t.chapter3.title}
        </h2>
        <p className="text-dark-text-secondary text-base sm:text-lg">
          {t.chapter3.intro}
        </p>
      </div>

      <div className="space-y-6">
        <section>
          <h3 className="text-xl sm:text-2xl font-semibold mb-2 md:mb-3 text-dark-text-primary">
            {t.chapter3.uploadText}
          </h3>
          <p className="text-dark-text-secondary leading-relaxed mb-4">
            {t.chapter3.uploadTextDesc}
          </p>
          
          {/* Mac 样式终端代码块 - 不需要打字效果 / Mac Style Terminal Code Block - No Typing Effect Needed */}
          <MacTerminalCodeBlock
            code={uploadTextCode}
            language="javascript"
            title="upload-text.js"
            animated={false}
            onTypingComplete={() => {}}
          />

          {/* 代码说明和关键概念 - 左右布局 / Code Explanation and Key Concepts - Side by Side */}
          <div className="mt-4 grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* 左侧：代码说明 / Left: Code Explanation */}
            <div className="p-4 bg-dark-surface border border-dark-border rounded-lg">
              <h4 className="text-lg font-semibold mb-3 text-dark-text-primary">
                {t.common.codeExplanation}
              </h4>
              <ul className="space-y-2 text-sm text-dark-text-secondary">
                <li className="flex items-start">
                  <span className="text-accent-primary mr-2">•</span>
                  <span>{t.common.importSDK}</span>
                </li>
                <li className="flex items-start">
                  <span className="text-accent-primary mr-2">•</span>
                  <span>{t.common.createUploader}</span>
                </li>
                <li className="flex items-start">
                  <span className="text-accent-primary mr-2">•</span>
                  <span>{t.common.convertToBuffer}</span>
                </li>
                <li className="flex items-start">
                  <span className="text-accent-primary mr-2">•</span>
                  <span>{t.common.addContentType}</span>
                </li>
                <li className="flex items-start">
                  <span className="text-accent-primary mr-2">•</span>
                  <span>{t.common.getReceipt}</span>
                </li>
              </ul>
            </div>

            {/* 右侧：关键概念 / Right: Key Concepts */}
            <div className="p-4 bg-accent-primary/10 border border-accent-primary/30 rounded-lg">
              <h4 className="text-lg font-semibold mb-3 text-accent-primary">
                {t.common.keyConcepts}
              </h4>
              <ul className="space-y-2 text-sm text-dark-text-secondary">
                <li className="flex items-start">
                  <span className="text-accent-primary mr-2">•</span>
                  <span><strong>{t.common.bufferExplanation}</strong></span>
                </li>
                <li className="flex items-start">
                  <span className="text-accent-primary mr-2">•</span>
                  <span><strong>{t.common.utf8Explanation}</strong></span>
                </li>
                <li className="flex items-start">
                  <span className="text-accent-primary mr-2">•</span>
                  <span><strong>{t.common.tagsExplanation}</strong></span>
                </li>
                <li className="flex items-start">
                  <span className="text-accent-primary mr-2">•</span>
                  <span><strong>{t.common.receiptExplanation}</strong></span>
                </li>
              </ul>
            </div>
          </div>

          {/* 具体操作教程 / Specific Operation Tutorial */}
          <div className="mt-4 p-6 bg-gradient-to-br from-accent-primary/5 to-accent-secondary/5 border-2 border-accent-primary/20 rounded-xl">
            <h4 className="text-xl font-bold mb-4 text-dark-text-primary flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-accent-primary to-accent-secondary rounded-lg flex items-center justify-center">
                <ClipboardIcon className="w-5 h-5 text-white" />
              </div>
              {t.common.operationSteps}
            </h4>
            <div className="space-y-3 text-dark-text-secondary">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-accent-primary text-white rounded-full flex items-center justify-center font-bold">
                  1
                </div>
                <div>
                  <p className="font-semibold text-dark-text-primary mb-1">{t.common.installStep}</p>
                  <code className="text-sm bg-dark-bg px-2 py-1 rounded">npm install @irys/upload @irys/upload-ethereum</code>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-accent-primary text-white rounded-full flex items-center justify-center font-bold">
                  2
                </div>
                <div>
                  <p className="font-semibold text-dark-text-primary mb-1">{t.common.createFile}</p>
                  <p className="text-sm">{language === 'zh' ? '复制上面的代码，保存为' : 'Copy the code above and save as'} <code className="bg-dark-bg px-2 py-1 rounded">upload-text.js</code></p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-accent-primary text-white rounded-full flex items-center justify-center font-bold">
                  3
                </div>
                <div>
                  <p className="font-semibold text-dark-text-primary mb-1">{t.common.configureEnv}</p>
                  <p className="text-sm">{language === 'zh' ? '确保' : 'Make sure'} <code className="bg-dark-bg px-2 py-1 rounded">.env</code> {language === 'zh' ? '文件中有' : 'file contains'} <code className="bg-dark-bg px-2 py-1 rounded">PRIVATE_KEY</code></p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-accent-primary text-white rounded-full flex items-center justify-center font-bold">
                  4
                </div>
                <div>
                  <p className="font-semibold text-dark-text-primary mb-1">{t.common.runCode}</p>
                  <code className="text-sm bg-dark-bg px-2 py-1 rounded">node upload-text.js</code>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-accent-primary text-white rounded-full flex items-center justify-center font-bold">
                  5
                </div>
                <div>
                  <p className="font-semibold text-dark-text-primary mb-1">{t.common.accessData}</p>
                  <p className="text-sm">{language === 'zh' ? '复制终端输出的网关地址（形如' : 'Copy the gateway URL from terminal output (like'} <code className="bg-dark-bg px-2 py-1 rounded">https://gateway.irys.xyz/[数据ID]</code>{language === 'zh' ? '），在浏览器中打开即可查看上传的文本内容' : '), open it in browser to view uploaded text'}</p>
                </div>
              </div>

              <div className="mt-4 p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
                <p className="text-sm text-green-400 flex items-start gap-2">
                  <CheckCircledIcon className="w-5 h-5 mt-0.5 flex-shrink-0" />
                  <span><strong>{t.common.successIndicator}：</strong>{language === 'zh' ? '终端显示 "✅ 上传成功！" 和详细的响应数据（包括交易 ID、时间戳等），并且在浏览器中打开访问地址能看到 "你好世界 Hello IRYS!"' : 'Terminal shows "✅ Upload successful!" with detailed response data (including transaction ID, timestamp, etc.), and opening the URL in browser shows "你好世界 Hello IRYS!"'}</span>
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* 测验和导航按钮区域 / Quiz and Navigation Area */}
      <div className="pt-6 md:pt-8 border-t border-dark-border">
        <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4">
          <div>
            <Button variant="ghost" onClick={onPrevious} className="w-full sm:w-auto">
              ← {t.previous}
            </Button>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
            {/* 开始测试按钮 / Start Quiz Button */}
            {!quizCompleted && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Button
                  onClick={() => setShowQuiz(true)}
                  variant="outline"
                  className="border-accent-primary text-accent-primary hover:bg-accent-primary hover:text-white w-full sm:w-auto"
                >
                  {t.common.startQuiz}
                </Button>
              </motion.div>
            )}

            {/* 下一步按钮 - 测验完成前锁定 / Next Button - Locked Before Quiz Complete */}
            {quizCompleted ? (
              <Button onClick={onNext} className="w-full sm:w-auto">
                {t.next} →
              </Button>
            ) : (
              <div className="relative group w-full sm:w-auto">
                <Button
                  disabled
                  className="opacity-50 cursor-not-allowed flex items-center gap-2 w-full sm:w-auto"
                >
                  <LockClosedIcon className="w-4 h-4" />
                  {t.next}
                </Button>
                <div className="absolute bottom-full right-0 mb-2 w-48 p-2 bg-dark-surface border border-dark-border rounded-lg text-xs text-dark-text-secondary opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  {t.common.quizUnlockHint}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 测验弹窗 / Quiz Modal */}
      {showQuiz && (
        <Quiz
          questions={quizQuestions}
          chapterId={3}
          onComplete={handleQuizComplete}
          onCancel={() => setShowQuiz(false)}
        />
      )}
    </motion.div>
  )
}



