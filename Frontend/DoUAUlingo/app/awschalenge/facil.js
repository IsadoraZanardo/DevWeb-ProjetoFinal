import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

import { useTheme } from "../../contexts/ThemeContext";

const challenges = [
  {
    id: "1",
    category: "AWS",
    level: "Fácil",
    title: "Criando um Bucket S3",
    emoji: "☁️",
    xp: 50,

    tutorial: [
      {
        title: "O que você vai aprender",
        text:
          "Neste módulo você aprenderá os conceitos fundamentais do Amazon S3, o serviço de armazenamento em nuvem da AWS. Você entenderá como os buckets funcionam, como armazenar arquivos na nuvem e como utilizar o S3 para hospedar conteúdos, backups e aplicações web.",
      },

      {
        title: "O que é o Amazon S3?",
        text:
          "O Amazon S3 (Simple Storage Service) é um serviço de armazenamento de objetos da AWS utilizado para guardar arquivos de forma segura, escalável e altamente disponível.\n\nCom ele é possível armazenar:\n• Imagens\n• Vídeos\n• Documentos\n• Backups\n• Sites estáticos\n• Arquivos de aplicações\n\nO S3 é amplamente utilizado por empresas para armazenamento em nuvem devido à sua durabilidade, segurança e facilidade de integração com outros serviços AWS.",
      },

      {
        title: "O que é um Bucket?",
        text:
          "Um bucket é a estrutura principal de armazenamento dentro do Amazon S3. Ele funciona como um grande contêiner onde todos os arquivos, pastas e objetos ficam organizados na nuvem da AWS.\n\nPodemos comparar um bucket a uma pasta principal do computador, porém com recursos avançados de armazenamento em nuvem, segurança, escalabilidade e disponibilidade global.",
      },

      {
        title: "Exemplo de estrutura",
        text:
          "meu-site-bucket\n├── imagens/\n├── documentos/\n└── index.html\n\nCada bucket possui:\n• Nome único globalmente\n• Região AWS\n• Permissões de acesso\n• Configurações de versionamento e segurança",
      },

      {
        title: "Como criar um Bucket S3",
        text:
          "Passo 1 — Acessar o serviço S3\n\nEntre no Console AWS\nPesquise por:\nS3\nClique no serviço Amazon S3\n\nPasso 2 — Criar Bucket\nClique em:\nCreate bucket\n\nDefina:\n• Nome do bucket\n• Região AWS\n\nExemplo:\nmeu-primeiro-bucket-aws\n\nPasso 3 — Configurar permissões\nVocê pode escolher:\n• Bucket privado\n• Bucket público\n• Hospedagem de site estático\n\nPara projetos web, normalmente é necessário permitir acesso público aos arquivos.\n\nPasso 4 — Criar bucket\nClique em:\nCreate bucket\n\nPronto! Seu bucket foi criado.",
      },

      {
        title: "Como enviar arquivos para o Bucket",
        text:
          "Abra o bucket criado\n\nClique em:\n✅ Upload\n\nAdicione arquivos do computador\n\nClique em:\n✅ Upload\n\nOs arquivos ficarão armazenados na nuvem AWS.",
      },

      {
        title: "Hospedando um site no S3",
        text:
          "O S3 também pode ser utilizado para hospedar sites estáticos feitos com:\n\n• HTML\n• CSS\n• JavaScript\n• React/Vite buildado\n\nBasta:\n• Enviar os arquivos\n• Habilitar Static Website Hosting\n• Liberar permissões públicas",
      },

      {
        title: "🔐 Segurança no S3",
        text:
          "Boas práticas importantes:\n\n• Não deixar buckets públicos sem necessidade\n• Utilizar políticas IAM\n• Ativar versionamento\n• Utilizar criptografia\n• Monitorar acessos",
      },
    ],

    finalChallenge:
      "Crie um Bucket S3 e envie 3 arquivos diferentes para dentro dele.",

    requirements: [
      "Criar um bucket",
      "Enviar 3 arquivos diferentes",
      "Compartilhar print do bucket criado",
    ],

    expectedResult: [
      "Entender o funcionamento do Amazon S3",
      "Criar buckets",
      "Enviar arquivos",
      "Organizar armazenamento em nuvem",
      "Utilizar o S3 em projetos web e aplicações cloud",
    ],

    questions: [
      {
        question: "O que é o Amazon S3?",
        options: [
          "Um serviço de armazenamento da AWS",
          "Um banco de dados SQL",
          "Uma máquina virtual Linux",
        ],
        answer: "Um serviço de armazenamento da AWS",
      },

      {
        question: "O que é um bucket?",
        options: [
          "Uma pasta principal do S3",
          "Um tipo de API",
          "Um servidor EC2",
        ],
        answer: "Uma pasta principal do S3",
      },

      {
        question: "Qual destas opções pode ser armazenada no S3?",
        options: [
          "Imagens e documentos",
          "Somente bancos de dados",
          "Somente arquivos Java",
        ],
        answer: "Imagens e documentos",
      },

      {
        question: "O que é necessário para hospedar um site no S3?",
        options: [
          "Habilitar Static Website Hosting",
          "Criar uma EC2",
          "Instalar Apache",
        ],
        answer: "Habilitar Static Website Hosting",
      },

      {
        question: "Qual é uma boa prática de segurança no S3?",
        options: [
          "Não deixar buckets públicos sem necessidade",
          "Compartilhar acesso root",
          "Desativar criptografia",
        ],
        answer: "Não deixar buckets públicos sem necessidade",
      },
    ],
  },
];

export default function ChallengeScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { theme } = useTheme();

  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [completed, setCompleted] = useState(false);

  const challenge = challenges.find((item) => item.id === String(id));

  if (!challenge) {
    return (
      <View style={[styles.center, { backgroundColor: theme.background }]}>
        <Text style={[styles.errorTitle, { color: theme.text }]}>
          Desafio não encontrado 😵
        </Text>

        <TouchableOpacity style={styles.button} onPress={() => router.back()}>
          <Text style={styles.buttonText}>VOLTAR</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const totalQuestions = challenge.questions.length;

  const correctAnswers = challenge.questions.filter(
    (item, index) => selectedAnswers[index] === item.answer
  ).length;

  const allAnswered = Object.keys(selectedAnswers).length === totalQuestions;
  const canComplete = allAnswered && correctAnswers === totalQuestions;

  const selectAnswer = (questionIndex, option) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionIndex]: option,
    }));
  };

  const finishChallenge = () => {
    if (!canComplete) return;
    setCompleted(true);
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.background }]}
      contentContainerStyle={styles.content}
    >
      <TouchableOpacity onPress={() => router.back()}>
        <Text style={styles.backText}>← Voltar</Text>
      </TouchableOpacity>

      <View style={[styles.heroCard, { backgroundColor: theme.card }]}>
        <Text style={styles.emoji}>{challenge.emoji}</Text>

        <Text style={[styles.category, { color: theme.subtext }]}>
          {challenge.category} • {challenge.level}
        </Text>

        <Text style={[styles.title, { color: theme.text }]}>
          {challenge.title}
        </Text>

        <Text style={styles.xp}>+{challenge.xp} XP</Text>
      </View>

      <Text style={[styles.sectionTitle, { color: theme.text }]}>
        Tutorial
      </Text>

      {challenge.tutorial.map((topic, index) => (
        <View
          key={index}
          style={[styles.topicCard, { backgroundColor: theme.card }]}
        >
          <Text style={styles.topicNumber}>0{index + 1}</Text>

          <Text style={[styles.topicTitle, { color: theme.text }]}>
            {topic.title}
          </Text>

          <Text style={[styles.topicText, { color: theme.subtext }]}>
            {topic.text}
          </Text>
        </View>
      ))}

      <View style={styles.finalCard}>
        <Text style={styles.finalEmoji}>🎯</Text>
        <Text style={styles.finalTitle}>Desafio prático</Text>
        <Text style={styles.finalText}>{challenge.finalChallenge}</Text>
      </View>

      <Text style={[styles.sectionTitle, { color: theme.text }]}>
        Responda para concluir
      </Text>

      {challenge.questions.map((item, questionIndex) => (
        <View
          key={questionIndex}
          style={[styles.questionCard, { backgroundColor: theme.card }]}
        >
          <Text style={[styles.questionText, { color: theme.text }]}>
            {questionIndex + 1}. {item.question}
          </Text>

          {item.options.map((option) => {
            const selected = selectedAnswers[questionIndex] === option;
            const isCorrect = option === item.answer;

            return (
              <TouchableOpacity
                key={option}
                style={[
                  styles.optionButton,
                  selected && styles.selectedOption,
                  selected && isCorrect && styles.correctOption,
                  selected && !isCorrect && styles.wrongOption,
                ]}
                onPress={() => selectAnswer(questionIndex, option)}
              >
                <Text style={styles.optionText}>{option}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      ))}

      <Text style={[styles.resultText, { color: theme.subtext }]}>
        Acertos: {correctAnswers}/{totalQuestions}
      </Text>

      {completed && (
        <View style={styles.completedCard}>
          <Text style={styles.completedTitle}>Módulo concluído! 🏆</Text>
          <Text style={styles.completedText}>
            Boa! Você concluiu esse desafio e ganhou {challenge.xp} XP.
          </Text>
        </View>
      )}

      <TouchableOpacity
        disabled={!canComplete}
        style={[styles.button, !canComplete && styles.disabledButton]}
        onPress={finishChallenge}
      >
        <Text style={styles.buttonText}>
          {canComplete ? "CONCLUIR MÓDULO" : "RESPONDA TUDO CORRETAMENTE"}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },

  content: {
    padding: 22,
    paddingBottom: 100,
  },

  backText: {
    color: "#58cc02",
    fontSize: 16,
    fontWeight: "900",
    marginBottom: 18,
  },

  heroCard: {
    borderRadius: 26,
    padding: 22,
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#e5e5e5",
    borderBottomWidth: 6,
    borderBottomColor: "#d1d1d1",
    marginBottom: 24,
  },

  emoji: {
    fontSize: 58,
    marginBottom: 8,
  },

  category: {
    fontSize: 14,
    fontWeight: "900",
    marginBottom: 8,
  },

  title: {
    fontSize: 25,
    fontWeight: "900",
    textAlign: "center",
  },

  xp: {
    marginTop: 12,
    color: "#ffb020",
    fontSize: 16,
    fontWeight: "900",
  },

  sectionTitle: {
    fontSize: 22,
    fontWeight: "900",
    marginBottom: 14,
  },

  topicCard: {
    borderRadius: 22,
    padding: 18,
    marginBottom: 14,
    borderWidth: 2,
    borderColor: "#e5e5e5",
    borderBottomWidth: 5,
    borderBottomColor: "#d1d1d1",
  },

  topicNumber: {
    color: "#58cc02",
    fontSize: 16,
    fontWeight: "900",
    marginBottom: 8,
  },

  topicTitle: {
    fontSize: 19,
    fontWeight: "900",
    marginBottom: 8,
  },

  topicText: {
    fontSize: 14,
    lineHeight: 21,
    fontWeight: "700",
  },

  finalCard: {
    backgroundColor: "#58cc02",
    borderRadius: 24,
    padding: 22,
    marginTop: 10,
    marginBottom: 24,
    borderBottomWidth: 6,
    borderBottomColor: "#46a302",
  },

  finalEmoji: {
    fontSize: 34,
    marginBottom: 8,
  },

  finalTitle: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "900",
    marginBottom: 10,
  },

  finalText: {
    color: "#fff",
    fontSize: 15,
    lineHeight: 22,
    fontWeight: "800",
  },

  questionCard: {
    borderRadius: 22,
    padding: 18,
    marginBottom: 16,
    borderWidth: 2,
    borderColor: "#e5e5e5",
    borderBottomWidth: 5,
    borderBottomColor: "#d1d1d1",
  },

  questionText: {
    fontSize: 17,
    fontWeight: "900",
    marginBottom: 12,
  },

  optionButton: {
    padding: 14,
    borderRadius: 16,
    backgroundColor: "#f1f1f1",
    marginBottom: 10,
    borderWidth: 2,
    borderColor: "#ddd",
  },

  selectedOption: {
    borderColor: "#58cc02",
  },

  correctOption: {
    backgroundColor: "#d7ffb8",
  },

  wrongOption: {
    backgroundColor: "#ffd6d6",
    borderColor: "#ff4b4b",
  },

  optionText: {
    fontSize: 14,
    fontWeight: "900",
    color: "#333",
  },

  resultText: {
    fontSize: 15,
    fontWeight: "900",
    marginBottom: 14,
  },

  completedCard: {
    backgroundColor: "#d7ffb8",
    borderRadius: 22,
    padding: 18,
    marginBottom: 16,
    borderWidth: 2,
    borderColor: "#58cc02",
    borderBottomWidth: 5,
    borderBottomColor: "#46a302",
  },

  completedTitle: {
    color: "#2f7d00",
    fontSize: 20,
    fontWeight: "900",
    marginBottom: 8,
  },

  completedText: {
    color: "#2f7d00",
    fontSize: 14,
    fontWeight: "800",
  },

  button: {
    backgroundColor: "#58cc02",
    paddingVertical: 16,
    borderRadius: 18,
    alignItems: "center",
    borderBottomWidth: 5,
    borderBottomColor: "#46a302",
  },

  disabledButton: {
    backgroundColor: "#b7b7b7",
    borderBottomColor: "#8f8f8f",
  },

  buttonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "900",
  },

  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 22,
  },

  errorTitle: {
    fontSize: 22,
    fontWeight: "900",
    marginBottom: 20,
  },
});