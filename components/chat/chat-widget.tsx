'use client';

import { useState, useRef, useEffect } from 'react';
import {
  MessageCircle,
  X,
  Send,
  ChevronLeft,
  Package,
  BadgeCheck,
  Image as ImageIcon,
  Smile,
  MoreVertical,
  Search,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useChatStore, useAuthStore, Conversation } from '@/lib/store';
import { formatTZS, formatRelativeTime } from '@/lib/data';
import { cn } from '@/lib/utils';

export function ChatWidget() {
  const { user } = useAuthStore();
  const {
    conversations,
    activeConversationId,
    isOpen,
    setActiveConversation,
    addMessage,
    closeChat,
    getTotalUnread,
  } = useChatStore();

  const [message, setMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const activeConversation = conversations.find(
    (c) => c.id === activeConversationId
  );

  const filteredConversations = conversations.filter((conv) =>
    conv.productTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
    conv.sellerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    conv.buyerName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [activeConversation?.messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || !activeConversationId || !user) return;

    addMessage(activeConversationId, {
      senderId: user.id,
      content: message.trim(),
    });
    setMessage('');
  };

  const totalUnread = getTotalUnread();

  if (!isOpen) {
    return (
      <Button
        onClick={() => useChatStore.getState().toggleChat()}
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg z-50"
        size="icon"
      >
        <MessageCircle className="h-6 w-6" />
        {totalUnread > 0 && (
          <span className="absolute -top-1 -right-1 h-5 w-5 bg-destructive text-destructive-foreground text-xs rounded-full flex items-center justify-center">
            {totalUnread > 9 ? '9+' : totalUnread}
          </span>
        )}
      </Button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 w-[380px] h-[600px] bg-background border border-border rounded-2xl shadow-2xl flex flex-col overflow-hidden z-50">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border bg-muted/30">
        {activeConversation ? (
          <>
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() => setActiveConversation(null)}
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-primary/10 text-primary text-sm">
                    {user?.id === activeConversation.buyerId
                      ? activeConversation.sellerName.charAt(0)
                      : activeConversation.buyerName.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="flex items-center gap-1">
                    <span className="font-medium text-sm">
                      {user?.id === activeConversation.buyerId
                        ? activeConversation.sellerName
                        : activeConversation.buyerName}
                    </span>
                    {activeConversation.sellerVerified && user?.id === activeConversation.buyerId && (
                      <BadgeCheck className="h-4 w-4 text-primary" />
                    )}
                  </div>
                  <span className="text-xs text-muted-foreground">Online</span>
                </div>
              </div>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>View Profile</DropdownMenuItem>
                <DropdownMenuItem>Block User</DropdownMenuItem>
                <DropdownMenuItem className="text-destructive">Report</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        ) : (
          <>
            <div className="flex items-center gap-2">
              <MessageCircle className="h-5 w-5 text-primary" />
              <span className="font-semibold">Messages</span>
              {totalUnread > 0 && (
                <Badge variant="secondary" className="h-5 px-1.5">
                  {totalUnread}
                </Badge>
              )}
            </div>
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={closeChat}>
              <X className="h-5 w-5" />
            </Button>
          </>
        )}
      </div>

      {activeConversation ? (
        <>
          {/* Product info bar */}
          <div className="flex items-center gap-3 p-3 border-b border-border bg-muted/20">
            <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center overflow-hidden shrink-0">
              {activeConversation.productImage.startsWith('http') ? (
                <img
                  src={activeConversation.productImage}
                  alt=""
                  className="w-full h-full object-cover"
                />
              ) : (
                <Package className="h-5 w-5 text-muted-foreground" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{activeConversation.productTitle}</p>
              <p className="text-sm text-primary font-semibold">
                {formatTZS(activeConversation.productPrice)}
              </p>
            </div>
          </div>

          {/* Messages */}
          <ScrollArea className="flex-1 p-4">
            {activeConversation.messages.length === 0 ? (
              <div className="text-center py-8">
                <MessageCircle className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                <p className="text-muted-foreground text-sm">
                  Start the conversation about this item
                </p>
                <div className="mt-4 flex flex-wrap justify-center gap-2">
                  {['Is this still available?', 'What is the lowest price?', 'Can I see more photos?'].map((quick) => (
                    <Button
                      key={quick}
                      variant="outline"
                      size="sm"
                      className="text-xs"
                      onClick={() => setMessage(quick)}
                    >
                      {quick}
                    </Button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {activeConversation.messages.map((msg) => {
                  const isOwn = msg.senderId === user?.id;
                  return (
                    <div
                      key={msg.id}
                      className={cn('flex', isOwn ? 'justify-end' : 'justify-start')}
                    >
                      <div
                        className={cn(
                          'max-w-[80%] rounded-2xl px-4 py-2',
                          isOwn
                            ? 'bg-primary text-primary-foreground rounded-br-sm'
                            : 'bg-muted rounded-bl-sm'
                        )}
                      >
                        <p className="text-sm">{msg.content}</p>
                        <p
                          className={cn(
                            'text-[10px] mt-1',
                            isOwn ? 'text-primary-foreground/70' : 'text-muted-foreground'
                          )}
                        >
                          {formatRelativeTime(msg.createdAt)}
                        </p>
                      </div>
                    </div>
                  );
                })}
                <div ref={messagesEndRef} />
              </div>
            )}
          </ScrollArea>

          {/* Message input */}
          <form onSubmit={handleSendMessage} className="p-3 border-t border-border">
            <div className="flex items-center gap-2">
              <Button type="button" variant="ghost" size="icon" className="h-9 w-9 shrink-0">
                <ImageIcon className="h-5 w-5" />
              </Button>
              <Button type="button" variant="ghost" size="icon" className="h-9 w-9 shrink-0">
                <Smile className="h-5 w-5" />
              </Button>
              <Input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 h-10"
              />
              <Button
                type="submit"
                size="icon"
                className="h-10 w-10 shrink-0"
                disabled={!message.trim()}
              >
                <Send className="h-5 w-5" />
              </Button>
            </div>
          </form>
        </>
      ) : (
        <>
          {/* Search */}
          <div className="p-3 border-b border-border">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search conversations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 h-9"
              />
            </div>
          </div>

          {/* Conversations list */}
          <ScrollArea className="flex-1">
            {filteredConversations.length === 0 ? (
              <div className="text-center py-12 px-4">
                <MessageCircle className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="font-semibold mb-2">No messages yet</h3>
                <p className="text-sm text-muted-foreground">
                  Start a conversation with a seller by clicking &quot;Start Chat&quot; on any product
                </p>
              </div>
            ) : (
              <div className="divide-y divide-border">
                {filteredConversations.map((conv) => (
                  <ConversationItem
                    key={conv.id}
                    conversation={conv}
                    currentUserId={user?.id}
                    onClick={() => setActiveConversation(conv.id)}
                  />
                ))}
              </div>
            )}
          </ScrollArea>
        </>
      )}
    </div>
  );
}

function ConversationItem({
  conversation,
  currentUserId,
  onClick,
}: {
  conversation: Conversation;
  currentUserId?: string;
  onClick: () => void;
}) {
  const otherPartyName =
    currentUserId === conversation.buyerId
      ? conversation.sellerName
      : conversation.buyerName;

  return (
    <button
      onClick={onClick}
      className="w-full flex items-center gap-3 p-4 hover:bg-muted/50 transition-colors text-left"
    >
      <div className="relative">
        <Avatar className="h-12 w-12">
          <AvatarFallback className="bg-primary/10 text-primary">
            {otherPartyName.charAt(0)}
          </AvatarFallback>
        </Avatar>
        <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-background rounded-full" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2 mb-0.5">
          <div className="flex items-center gap-1">
            <span className="font-medium truncate">{otherPartyName}</span>
            {conversation.sellerVerified && currentUserId === conversation.buyerId && (
              <BadgeCheck className="h-4 w-4 text-primary shrink-0" />
            )}
          </div>
          <span className="text-xs text-muted-foreground shrink-0">
            {conversation.lastMessageAt
              ? formatRelativeTime(conversation.lastMessageAt)
              : formatRelativeTime(conversation.createdAt)}
          </span>
        </div>
        <p className="text-xs text-muted-foreground truncate mb-1">
          {conversation.productTitle}
        </p>
        <div className="flex items-center justify-between gap-2">
          <p className="text-sm text-muted-foreground truncate">
            {conversation.lastMessage || 'No messages yet'}
          </p>
          {conversation.unreadCount > 0 && (
            <span className="h-5 min-w-5 px-1.5 bg-primary text-primary-foreground text-xs rounded-full flex items-center justify-center shrink-0">
              {conversation.unreadCount}
            </span>
          )}
        </div>
      </div>
    </button>
  );
}
