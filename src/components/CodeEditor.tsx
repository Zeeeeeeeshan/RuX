
import React, { useState } from 'react';
import Editor from '@monaco-editor/react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowRight, Copy, Download, Play } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const sourceLanguages = [
  { label: 'JavaScript', value: 'javascript' },
  { label: 'Python', value: 'python' },
  { label: 'Java', value: 'java' },
  { label: 'C++', value: 'cpp' },
  { label: 'C#', value: 'csharp' },
  { label: 'PHP', value: 'php' },
  { label: 'Swift', value: 'swift' },
  { label: 'Ruby', value: 'ruby' },
  { label: 'Go', value: 'go' },
  { label: 'Rust', value: 'rust' },
  { label: 'TypeScript', value: 'typescript' },
];

const targetLanguages = [
  { label: 'JavaScript', value: 'javascript' },
  { label: 'Python', value: 'python' },
  { label: 'Java', value: 'java' },
  { label: 'C++', value: 'cpp' },
  { label: 'C#', value: 'csharp' },
  { label: 'PHP', value: 'php' },
  { label: 'Swift', value: 'swift' },
  { label: 'Ruby', value: 'ruby' },
  { label: 'Go', value: 'go' },
  { label: 'Rust', value: 'rust' },
  { label: 'TypeScript', value: 'typescript' },
  { label: 'Assembly', value: 'assembly' },
  { label: 'Binary', value: 'binary' },
];

// Code examples for different languages
const codeExamples: Record<string, string> = {
  javascript: `// JavaScript Example
function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

console.log(fibonacci(10));`,
  python: `# Python Example
def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n - 1) + fibonacci(n - 2)

print(fibonacci(10))`,
  java: `// Java Example
public class Fibonacci {
    public static int fibonacci(int n) {
        if (n <= 1) return n;
        return fibonacci(n - 1) + fibonacci(n - 2);
    }
    
    public static void main(String[] args) {
        System.out.println(fibonacci(10));
    }
}`,
  cpp: `// C++ Example
#include <iostream>

int fibonacci(int n) {
    if (n <= 1) return n;
    return fibonacci(n - 1) + fibonacci(n - 2);
}

int main() {
    std::cout << fibonacci(10) << std::endl;
    return 0;
}`,
  csharp: `// C# Example
using System;

class Program {
    static int Fibonacci(int n) {
        if (n <= 1) return n;
        return Fibonacci(n - 1) + Fibonacci(n - 2);
    }
    
    static void Main() {
        Console.WriteLine(Fibonacci(10));
    }
}`,
  php: `<?php
// PHP Example
function fibonacci($n) {
    if ($n <= 1) return $n;
    return fibonacci($n - 1) + fibonacci($n - 2);
}

echo fibonacci(10);
?>`,
  swift: `// Swift Example
func fibonacci(_ n: Int) -> Int {
    if n <= 1 { return n }
    return fibonacci(n - 1) + fibonacci(n - 2)
}

print(fibonacci(10))`,
  ruby: `# Ruby Example
def fibonacci(n)
  return n if n <= 1
  fibonacci(n - 1) + fibonacci(n - 2)
end

puts fibonacci(10)`,
  go: `// Go Example
package main

import "fmt"

func fibonacci(n int) int {
    if n <= 1 {
        return n
    }
    return fibonacci(n - 1) + fibonacci(n - 2)
}

func main() {
    fmt.Println(fibonacci(10))
}`,
  rust: `// Rust Example
fn fibonacci(n: u32) -> u32 {
    if n <= 1 {
        return n;
    }
    return fibonacci(n - 1) + fibonacci(n - 2);
}

fn main() {
    println!("{}", fibonacci(10));
}`,
  typescript: `// TypeScript Example
function fibonacci(n: number): number {
    if (n <= 1) return n;
    return fibonacci(n - 1) + fibonacci(n - 2);
}

console.log(fibonacci(10));`,
  assembly: `; Assembly Example (x86)
section .text
global _start

_start:
    mov eax, 10       ; n = 10
    call fibonacci    ; call fibonacci function
    
    ; convert result to ASCII and print
    add eax, '0'      ; convert to ASCII
    mov [result], eax
    
    mov eax, 4        ; sys_write
    mov ebx, 1        ; stdout
    mov ecx, result   ; message
    mov edx, 1        ; length
    int 0x80          ; interrupt
    
    mov eax, 1        ; sys_exit
    xor ebx, ebx      ; return 0
    int 0x80          ; interrupt

fibonacci:
    cmp eax, 1        ; if n <= 1
    jbe return        ; return n
    
    push eax          ; save n
    dec eax           ; n - 1
    call fibonacci    ; fibonacci(n - 1)
    
    mov ebx, eax      ; save result of fibonacci(n - 1)
    pop eax           ; restore n
    push ebx          ; save result of fibonacci(n - 1)
    
    sub eax, 2        ; n - 2
    call fibonacci    ; fibonacci(n - 2)
    
    pop ebx           ; restore result of fibonacci(n - 1)
    add eax, ebx      ; fibonacci(n - 1) + fibonacci(n - 2)
    
return:
    ret

section .data
result: db 0          ; variable to store result
`,
  binary: `01101010 01100001 01110110 01100001 01110011 01100011 01110010 01101001 01110000 01110100 00111010 00001010 01100110 01110101 01101110 01100011 01110100 01101001 01101111 01101110 00100000 01100110 01101001 01100010 01101111 01101110 01100001 01100011 01100011 01101001 00101000 01101110 00101001 00100000 01111011 00001010 00100000 00100000 01101001 01100110 00100000 00101000 01101110 00100000 00111100 00111101 00100000 00110001 00101001 00100000 01110010 01100101 01110100 01110101 01110010 01101110 00100000 01101110 00111011 00001010 00100000 00100000 01110010 01100101 01110100 01110101 01110010 01101110 00100000 01100110 01101001 01100010 01101111 01101110 01100001 01100011 01100011 01101001 00101000 01101110 00100000 00101101 00100000 00110001 00101001 00100000 00101011 00100000 01100110 01101001 01100010 01101111 01101110 01100001 01100011 01100011 01101001 00101000 01101110 00100000 00101101 00100000 00110010 00101001 00111011 00001010 01111101`
};

// Mock conversion function - in a real app, this would call a backend service
const convertCode = (sourceCode: string, sourceLanguage: string, targetLanguage: string): string => {
  // For demo purposes, we're just returning the example code of the target language
  // In a real application, this would call a backend service to do the conversion
  return codeExamples[targetLanguage] || 'Conversion not available for this language combination';
};

export const CodeEditor: React.FC = () => {
  const { toast } = useToast();
  const [sourceLanguage, setSourceLanguage] = useState('javascript');
  const [targetLanguage, setTargetLanguage] = useState('python');
  const [sourceCode, setSourceCode] = useState(codeExamples.javascript);
  const [targetCode, setTargetCode] = useState('');
  const [isConverting, setIsConverting] = useState(false);
  const [showPipeline, setShowPipeline] = useState(false);
  const [intermediateCode, setIntermediateCode] = useState('');
  
  const handleSourceLanguageChange = (value: string) => {
    setSourceLanguage(value);
    setSourceCode(codeExamples[value] || '');
  };
  
  const handleTargetLanguageChange = (value: string) => {
    setTargetLanguage(value);
  };
  
  const handleCodeChange = (value: string | undefined) => {
    if (value !== undefined) {
      setSourceCode(value);
    }
  };
  
  const handleConvert = () => {
    setIsConverting(true);
    
    // Show stages of conversion (simulated)
    setTimeout(() => {
      setShowPipeline(true);
      setIntermediateCode('// Converting to intermediate representation...');
      
      setTimeout(() => {
        setIntermediateCode('// Intermediate representation generated.\n' + sourceCode.split('\n').map(line => `IR: ${line}`).join('\n'));
        
        setTimeout(() => {
          const converted = convertCode(sourceCode, sourceLanguage, targetLanguage);
          setTargetCode(converted);
          setIsConverting(false);
          
          toast({
            title: "Conversion Complete",
            description: `Successfully converted from ${sourceLanguage} to ${targetLanguage}`,
          });
        }, 1000);
      }, 1000);
    }, 500);
  };
  
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to Clipboard",
      description: "Code has been copied to clipboard",
    });
  };
  
  const downloadCode = (text: string, language: string) => {
    const element = document.createElement('a');
    const file = new Blob([text], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = `converted-code.${language === 'javascript' ? 'js' : language === 'python' ? 'py' : language}`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    
    toast({
      title: "Download Started",
      description: `Code has been downloaded as ${element.download}`,
    });
  };
  
  return (
    <div className="w-full max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 mb-6">
        <div className="w-full md:w-1/2">
          <div className="flex items-center mb-2">
            <h3 className="text-lg font-medium mr-2">Source Language</h3>
            <Select value={sourceLanguage} onValueChange={handleSourceLanguageChange}>
              <SelectTrigger className="w-[180px] glowing-border bg-cyberpunk-darker">
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent className="bg-cyberpunk-darker border-cyberpunk-purple">
                {sourceLanguages.map(lang => (
                  <SelectItem key={lang.value} value={lang.value}>{lang.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="cyberpunk-card glowing-border min-h-[400px]">
            <Editor
              height="400px"
              language={sourceLanguage}
              value={sourceCode}
              onChange={handleCodeChange}
              theme="vs-dark"
              options={{
                minimap: { enabled: false },
                fontSize: 14,
                scrollBeyondLastLine: false,
                wordWrap: 'on',
                padding: { top: 10 },
              }}
            />
            <div className="flex justify-end mt-2 space-x-2">
              <Button 
                variant="outline" 
                size="sm" 
                className="bg-cyberpunk-darker hover:bg-cyberpunk-purple/20"
                onClick={() => copyToClipboard(sourceCode)}
              >
                <Copy size={16} className="mr-1" />
                Copy
              </Button>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col items-center justify-center md:justify-start">
          <Button 
            onClick={handleConvert} 
            disabled={isConverting}
            className="bg-gradient-to-r from-cyberpunk-purple to-cyberpunk-blue hover:from-cyberpunk-blue hover:to-cyberpunk-purple text-white px-6 py-2 rounded-lg transition-all duration-300 w-full md:w-auto animate-pulse-glow"
          >
            <Play className="mr-2" size={16} />
            {isConverting ? 'Converting...' : 'Convert'}
          </Button>
          
          <div className="my-4 text-center">
            <ArrowRight size={24} className="text-cyberpunk-purple animate-pulse inline" />
          </div>
          
          <div className="w-full md:w-auto">
            <Select value={targetLanguage} onValueChange={handleTargetLanguageChange}>
              <SelectTrigger className="w-[180px] glowing-border bg-cyberpunk-darker">
                <SelectValue placeholder="Select target" />
              </SelectTrigger>
              <SelectContent className="bg-cyberpunk-darker border-cyberpunk-purple">
                {targetLanguages.map(lang => (
                  <SelectItem key={lang.value} value={lang.value}>{lang.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="w-full md:w-1/2">
          <h3 className="text-lg font-medium mb-2">Target Language</h3>
          <div className="cyberpunk-card glowing-border min-h-[400px]">
            <Editor
              height="400px"
              language={targetLanguage}
              value={targetCode}
              theme="vs-dark"
              options={{
                readOnly: true,
                minimap: { enabled: false },
                fontSize: 14,
                scrollBeyondLastLine: false,
                wordWrap: 'on',
                padding: { top: 10 },
              }}
            />
            <div className="flex justify-end mt-2 space-x-2">
              <Button 
                variant="outline" 
                size="sm" 
                className="bg-cyberpunk-darker hover:bg-cyberpunk-purple/20"
                onClick={() => copyToClipboard(targetCode)}
                disabled={!targetCode}
              >
                <Copy size={16} className="mr-1" />
                Copy
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="bg-cyberpunk-darker hover:bg-cyberpunk-purple/20"
                onClick={() => downloadCode(targetCode, targetLanguage)}
                disabled={!targetCode}
              >
                <Download size={16} className="mr-1" />
                Download
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {showPipeline && (
        <div className="mt-6">
          <h3 className="text-lg font-medium mb-2">Conversion Pipeline</h3>
          <Card className="cyberpunk-card p-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="cyberpunk-card">
                <h4 className="text-cyberpunk-cyan mb-2">Source Code ({sourceLanguage})</h4>
                <pre className="text-xs text-white/70 overflow-auto max-h-40">
                  {sourceCode}
                </pre>
              </div>
              <div className="cyberpunk-card">
                <h4 className="text-cyberpunk-purple mb-2">Intermediate Representation</h4>
                <pre className="text-xs text-white/70 overflow-auto max-h-40">
                  {intermediateCode || 'Processing...'}
                </pre>
              </div>
              <div className="cyberpunk-card">
                <h4 className="text-cyberpunk-green mb-2">Target Code ({targetLanguage})</h4>
                <pre className="text-xs text-white/70 overflow-auto max-h-40">
                  {targetCode || 'Processing...'}
                </pre>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};
