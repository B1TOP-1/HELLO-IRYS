import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cross2Icon, CheckIcon, RocketIcon, TwitterLogoIcon } from '@radix-ui/react-icons';
import Button from '../UI/Button';
import { useLanguage } from '../../i18n/LanguageContext';

interface ChallengeModalProps {
  isOpen: boolean;
  onClose: () => void;
  challengeType: 'file' | 'image';
  onAccept?: () => void;
}

export const ChallengeModal: React.FC<ChallengeModalProps> = ({
  isOpen,
  onClose,
  challengeType,
  onAccept,
}) => {
  const { language } = useLanguage();

  const fileChallengeTasks = {
    zh: [
      {
        title: '任务要求',
        items: [
          '准备一个文本文件（支持 .txt、.json、.md、.csv 等格式）',
          '文件大小建议在 1KB - 10MB 之间',
          '文件内容可以是你的学习笔记、代码片段、或任何你想永久保存的文本内容',
        ]
      },
      {
        title: '上传步骤',
        items: [
          '确保你的钱包已连接且有足够的测试币',
          '使用 Irys SDK 或网页界面上传文件',
          '记录返回的交易 ID (Transaction ID)',
          '通过 Irys Explorer 验证上传是否成功',
        ]
      },
      {
        title: '完成标准',
        items: [
          '文件成功上传到 Irys 网络',
          '获得有效的交易 ID',
          '能够通过 Irys Explorer 访问你的文件',
          '发送推文并 @ 以下账号：@airdrop_326、@annitoBTC、@irys_xyz、@cn_irys_xyz',
        ]
      }
    ],
    en: [
      {
        title: 'Task Requirements',
        items: [
          'Prepare a text file (supports .txt, .json, .md, .csv, etc.)',
          'Recommended file size: 1KB - 10MB',
          'Content can be your study notes, code snippets, or any text you want to store permanently',
        ]
      },
      {
        title: 'Upload Steps',
        items: [
          'Ensure your wallet is connected with sufficient test tokens',
          'Upload the file using Irys SDK or web interface',
          'Record the returned Transaction ID',
          'Verify the upload success via Irys Explorer',
        ]
      },
      {
        title: 'Completion Criteria',
        items: [
          'File successfully uploaded to Irys network',
          'Valid Transaction ID obtained',
          'Accessible via Irys Explorer',
          'Tweet and mention: @airdrop_326, @annitoBTC, @irys_xyz, @cn_irys_xyz',
        ]
      }
    ]
  };

  const imageChallengeTasks = {
    zh: [
      {
        title: '任务要求',
        items: [
          '准备一张图片文件（支持 .jpg、.png、.gif、.webp 等格式）',
          '图片大小建议在 100KB - 50MB 之间',
          '图片内容可以是你的作品、头像、或任何你想永久保存的图片',
        ]
      },
      {
        title: '上传步骤',
        items: [
          '确保你的钱包已连接且有足够的测试币',
          '使用 Irys SDK 或网页界面上传图片',
          '记录返回的交易 ID (Transaction ID)',
          '通过 Irys Explorer 验证上传是否成功',
        ]
      },
      {
        title: '完成标准',
        items: [
          '图片成功上传到 Irys 网络',
          '获得有效的交易 ID',
          '能够通过 Irys Gateway 访问你的图片',
          '发送推文并 @ 以下账号：@airdrop_326、@annitoBTC、@irys_xyz、@cn_irys_xyz',
        ]
      }
    ],
    en: [
      {
        title: 'Task Requirements',
        items: [
          'Prepare an image file (supports .jpg, .png, .gif, .webp, etc.)',
          'Recommended file size: 100KB - 50MB',
          'Content can be your artwork, avatar, or any image you want to store permanently',
        ]
      },
      {
        title: 'Upload Steps',
        items: [
          'Ensure your wallet is connected with sufficient test tokens',
          'Upload the image using Irys SDK or web interface',
          'Record the returned Transaction ID',
          'Verify the upload success via Irys Explorer',
        ]
      },
      {
        title: 'Completion Criteria',
        items: [
          'Image successfully uploaded to Irys network',
          'Valid Transaction ID obtained',
          'Accessible via Irys Gateway',
          'Tweet and mention: @airdrop_326, @annitoBTC, @irys_xyz, @cn_irys_xyz',
        ]
      }
    ]
  };

  const tasks = challengeType === 'file' 
    ? fileChallengeTasks[language]
    : imageChallengeTasks[language];

  const tweetTemplate = challengeType === 'file'
    ? language === 'zh'
      ? '我刚刚完成了 #HELLO_IRYS 文件上传挑战！🎉\n\n通过 @irys_xyz 实现了永久数据存储\n交易ID: [你的交易ID]\n\n @airdrop_326 @annitoBTC @irys_xyz  @cn_irys_xyz \n\n#Web3 #PermanentStorage #Irys'
      : 'I just completed the #HELLO_IRYS file upload challenge! 🎉\n\nAchieved permanent data storage with @irys_xyz\nTransaction ID: [Your TX ID]\n\n @airdrop_326 @annitoBTC @irys_xyz @cn_irys_xyz\n\n#Web3 #PermanentStorage #Irys'
    : language === 'zh'
      ? '我刚刚完成了 #HELLO_IRYS 图片上传挑战！🎉\n\n通过 @irys_xyz 实现了永久图片存储\n交易ID: [你的交易ID]\n\n @airdrop_326 @annitoBTC @irys_xyz  @cn_irys_xyz \n\n#Web3 #PermanentStorage #Irys'
      : 'I just completed the #HELLO_IRYS image upload challenge! 🎉\n\nAchieved permanent image storage with @irys_xyz\nTransaction ID: [Your TX ID]\n\n @airdrop_326 @annitoBTC @irys_xyz  @cn_irys_xyz \n#Web3 #PermanentStorage #Irys';

  const handleTweetClick = () => {
    const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetTemplate)}`;
    window.open(tweetUrl, '_blank', 'width=550,height=420');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* 背景遮罩 / Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 z-50"
          />

          {/* 弹窗内容 / Modal Content */}
          <div className="fixed inset-0 flex items-center justify-center z-50 p-2 sm:p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: 'spring', duration: 0.5 }}
              className="bg-dark-surface border-2 border-accent-primary rounded-2xl shadow-2xl max-w-3xl w-full mx-2 sm:mx-4 max-h-[90vh] overflow-hidden pointer-events-auto"
            >
              {/* 头部 / Header */}
              <div className="bg-gradient-to-r from-accent-primary/20 to-accent-secondary/20 border-b border-dark-border px-4 sm:px-6 py-4 sm:py-5 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-accent-primary to-accent-secondary rounded-xl flex items-center justify-center shadow-lg flex-shrink-0">
                    <RocketIcon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-dark-text-primary truncate">
                      {language === 'zh' ? '挑战任务详情' : 'Challenge Details'}
                    </h2>
                    <p className="text-xs sm:text-sm text-dark-text-secondary truncate">
                      {challengeType === 'file' 
                        ? (language === 'zh' ? '挑战 A：文件上传' : 'Challenge A: File Upload')
                        : (language === 'zh' ? '挑战 B：图片上传' : 'Challenge B: Image Upload')}
                    </p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg hover:bg-dark-hover transition-colors flex items-center justify-center flex-shrink-0"
                >
                  <Cross2Icon className="w-4 h-4 sm:w-5 sm:h-5 text-dark-text-secondary" />
                </button>
              </div>

              {/* 内容区域 / Content */}
              <div className="p-3 sm:p-4 md:p-6 overflow-y-auto max-h-[calc(90vh-180px)] sm:max-h-[calc(90vh-200px)]">
                <div className="space-y-4 sm:space-y-6">
                  {tasks.map((section, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="relative space-y-2 sm:space-y-3"
                    >
                      <h3 className="text-base sm:text-lg font-bold text-dark-text-primary flex items-center gap-2">
                        <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center bg-accent-primary/20 flex-shrink-0">
                          <span className="font-bold text-accent-primary text-sm sm:text-base">
                            {index + 1}
                          </span>
                        </div>
                        <span className="break-words">{section.title}</span>
                      </h3>
                      <ul className="space-y-2 ml-8 sm:ml-10">
                        {section.items.map((item, itemIndex) => (
                          <li key={itemIndex} className="flex items-start gap-2 sm:gap-3 text-dark-text-secondary">
                            <CheckIcon className="w-4 h-4 sm:w-5 sm:h-5 mt-0.5 flex-shrink-0 text-green-400" />
                            <span className={`text-sm sm:text-base break-words ${itemIndex === section.items.length - 1 ? 'font-semibold text-accent-primary' : ''}`}>
                              {item}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  ))}

                  {/* 推文模板 / Tweet Template */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="relative mt-6"
                  >
                    <div className="p-3 sm:p-4 bg-blue-500/10 border border-blue-500/30 rounded-xl">
                      <div className="flex items-center gap-2 mb-2 sm:mb-3">
                        <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center bg-blue-500/20 flex-shrink-0">
                          <span className="font-bold text-blue-400 text-sm sm:text-base">
                            4
                          </span>
                        </div>
                        <TwitterLogoIcon className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400 flex-shrink-0" />
                        <h4 className="font-semibold text-dark-text-primary text-sm sm:text-base">
                          {language === 'zh' ? '推文模板' : 'Tweet Template'}
                        </h4>
                      </div>
                      <p className="text-[10px] sm:text-xs md:text-sm text-dark-text-secondary mb-2 sm:mb-3 whitespace-pre-wrap font-mono bg-dark-card p-2 sm:p-3 rounded-lg border border-dark-border overflow-x-auto break-words">
                        {tweetTemplate}
                      </p>
                      <Button
                        onClick={handleTweetClick}
                        className="w-full bg-blue-500 hover:bg-blue-600 text-sm sm:text-base"
                      >
                        <TwitterLogoIcon className="w-4 h-4" />
                        {language === 'zh' ? '在 Twitter 上分享' : 'Share on Twitter'}
                      </Button>
                    </div>
                  </motion.div>

                </div>
              </div>

              {/* 底部按钮 / Footer */}
              <div className="border-t border-dark-border px-4 sm:px-6 py-3 sm:py-4 bg-dark-card">
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 justify-end">
                  <Button
                    onClick={onClose}
                    variant="outline"
                    className="w-full sm:w-auto"
                  >
                    {language === 'zh' ? '关闭' : 'Close'}
                  </Button>
                  <Button
                    onClick={() => {
                      onAccept?.();
                      onClose();
                    }}
                    className="w-full sm:w-auto bg-gradient-to-r from-accent-primary to-accent-secondary"
                  >
                    {language === 'zh' ? '开始挑战' : 'Start Challenge'}
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

