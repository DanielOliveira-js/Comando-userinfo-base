const Discord = require('discord.js');

module.exports = {
    name: 'userinfo',
    description: 'Ao usar o comando, o membro terá informações dele mesmo ou de um membro que ele marcar com o comando.',
    async execute(message, args) {
        const moment = require('moment'); 
        moment.locale('pt-br'); 

        const usuario = message.mentions.users.first() || message.author; 
        const membro = message.guild.members.cache.get(usuario.id);

        const buscarUsuario = usuario.bot ? ':robot:' : ':person_raising_hand:';
        const botOuMembro = usuario.bot ? 'bot' : 'membro';
        const cargos = membro.roles.cache.filter(role => role.id !== message.guild.id).map(role => role.toString()).join(', ');
        
        const userinfoEmbed = new Discord.MessageEmbed()
            .setColor('RANDOM')
            .setTitle(`${buscarUsuario} ${usuario.tag}`)
            .setDescription(`Veja as informações sobre o(a) ${botOuMembro} ${usuario.username} abaixo:`)
            .setThumbnail(`${usuario.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 })}`)
            .addFields(
                { name: ':desktop: ID', value: '`' + usuario.id + '`', inline: true },
                { name: ':tada: Conta desde', value: '`' + moment(usuario.createdAt).format('LLLL') + '`', inline: true },
                { name: ':label: Apelido', value: '`' + `${membro.nickname ? membro.nickname : 'Sem apelido'}` + '`', inline: true },
                { name: ':confetti_ball: Entrou',value: '`' + moment(membro.joinedAt).format('LLLL') ? moment(membro.joinedAt).format('LLLL') : 'Este membro não participa deste servidor.' + '`', inline: true },
                { name: ':gem: Cargo(s)', value: cargos ? cargos : '`Este membro não possui cargos.`', inline: true}
            )
            .setTimestamp()
            .setFooter(`Requisitado por ${message.author.tag}`, message.author.displayAvatarURL());

        message.channel.send(message.author, userinfoEmbed);
    },
};
